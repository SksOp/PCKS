#!/usr/bin/env node
const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');
const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const OUTPUT_ROOT = path.resolve(__dirname, 'geenrated-result');
const BASE_URL = 'https://pcks.devflex.co.in';

// Reuse the existing admin SDK credential from the desktop app
const serviceAccount = require('../desktop/src/utils/service_key.json');

initializeApp({
  credential: cert(serviceAccount),
});

const DB = getFirestore();
DB.settings({ ignoreUndefinedProperties: true });

function log(message) {
  console.log(`[PCKS CLI] ${message}`);
}

function promptUser() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (question) =>
    new Promise((resolve) =>
      rl.question(question, (answer) => resolve(answer.trim()))
    );

  return (async () => {
    log('Welcome to PCKS result downloader (CLI)');
    const year = await ask('Enter year (e.g. 2023): ');

    const termMap = {
      1: 'first',
      2: 'annual',
      3: 'second',
    };

    log('Select term:');
    log('  1) First');
    log('  2) Annual');
    log('  3) Second');
    const termChoice = await ask('Choice (1/2/3): ');
    rl.close();

    const term = termMap[termChoice] || termChoice.toLowerCase();

    if (!year || !term || !['first', 'annual', 'second'].includes(term)) {
      throw new Error(
        'Invalid input. Please provide a year and a valid term (first/annual/second).'
      );
    }

    return { year, term };
  })();
}

async function fetchAdmissions(year, term) {
  const collectionPath = `results/${year}/${term}`;
  log(`Fetching admissions from Firestore at ${collectionPath}...`);
  const snapshot = await DB.collection(collectionPath).get();

  if (snapshot.empty) {
    throw new Error('No results found for the provided year and term.');
  }

  const results = snapshot.docs.map((doc) => ({
    id: doc.id,
    isCompleted: doc.data().isCompleted,
  }));

  console.log(results);

  const completed = results.filter((item) => item.isCompleted);
  log(
    `Found ${results.length} records, ${completed.length} marked as completed.`
  );
  if (!completed.length) {
    throw new Error('No completed results found to download.');
  }

  return completed;
}

async function downloadAndMerge({ year, term, admissions }) {
  const runDir = path.join(OUTPUT_ROOT, `${year}-${term}-${Date.now()}`);
  fs.mkdirSync(runDir, { recursive: true });
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pcks-cli-'));
  log(`Using temp directory: ${tempDir}`);
  log(`Output directory: ${runDir}`);

  let browser;
  let page;
  const downloaded = [];

  try {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    page.setDefaultNavigationTimeout(60_000);

    for (let index = 0; index < admissions.length; index++) {
      const admissionNo = admissions[index].id;
      const url = `${BASE_URL}/dashboard/result/view?batch=${year}&term=${term}&admissionNo=${admissionNo}`;
      log(`(${index + 1}/${admissions.length}) Fetching ${url}`);
      await page.goto(url, { waitUntil: 'networkidle2' });
      //   await page.waitForTimeout(1_000);
      const pdfPath = path.join(tempDir, `${admissionNo}.pdf`);
      await page.emulateMediaType('print');
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
      });
      downloaded.push(pdfPath);
      log(`Saved PDF for ${admissionNo} -> ${pdfPath}`);
    }

    log('Merging PDFs...');
    const mergedPdf = await PDFDocument.create();
    for (let idx = 0; idx < downloaded.length; idx++) {
      const pdfPath = downloaded[idx];
      const pdfBytes = fs.readFileSync(pdfPath);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
      log(`Merged ${idx + 1}/${downloaded.length}`);
    }

    const mergedPdfBytes = await mergedPdf.save();
    const mergedPath = path.join(runDir, `results-${year}-${term}.pdf`);
    fs.writeFileSync(mergedPath, mergedPdfBytes);
    log(`Merged PDF saved at ${mergedPath}`);

    // Optionally keep individual PDFs alongside merged output for auditing
    downloaded.forEach((pdfPath) => {
      const dest = path.join(runDir, path.basename(pdfPath));
      fs.copyFileSync(pdfPath, dest);
    });
    log('Copied individual PDFs to output directory.');

    return { mergedPath, runDir, tempDir, downloaded };
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (error) {
        log(`Error closing browser: ${error.message}`);
      }
    }
    // Clean temp files
    try {
      downloaded.forEach((file) => fs.rmSync(file, { force: true }));
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (error) {
      log(`Error cleaning up temp directory: ${error.message}`);
    }
  }
}

async function run() {
  try {
    const { year, term } = await promptUser();
    const admissions = await fetchAdmissions(year, term);
    await downloadAndMerge({ year, term, admissions });
    log('All done. Check the geenrated-result folder for outputs.');
  } catch (error) {
    log(`Error: ${error.message || error}`);
    process.exitCode = 1;
  }
}

run();
