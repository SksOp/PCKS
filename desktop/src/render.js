const puppeteer = require("puppeteer");
const { ipcRenderer } = require("electron");
const { resultsCollection, DB } = require("./utils/db");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const os = require("os");

async function download(event) {
  event.preventDefault();
  const modal = document.getElementById("infoModal");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const submitBtn = document.getElementById("submitBtn");

  modal.style.display = "block";
  submitBtn.disabled = true;
  progressText.innerText = "Getting admission numbers...";
  progressBar.style.width = "10%"; // Example starting point

  const batch = document.getElementById("batch").value;
  const term = document.getElementById("term").value;

  if (!batch || !term) {
    return alert("Please select batch and term");
  }
  console.log("Downloading results for", batch, term);
  // get all admission numbers
  const collectionPath = `${resultsCollection}/${batch}/${term.toLowerCase()}`;
  const snapshot = await DB.collection(collectionPath).get();

  if (snapshot.empty) {
    return alert("No results found");
  }

  const results = snapshot.docs.map((doc) => ({
    id: doc.id,
    isCompleted: doc.data().isCompleted,
  }));

  const isDevelopment = process.env.NODE_ENV === "development";
  const baseURL = isDevelopment
    ? "http://localhost:3000"
    : "https://pcksstm.web.app";

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "my-app-"));
  const downloadedPDFs = [];

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const total = results.length;
  let current = 0;
  progressText.innerText = "Making PDFS...";

  for (const result of results) {
    const { id: admissionNo, isCompleted } = result;
    if (!isCompleted) continue;
    const url = `${baseURL}/dashboard/result/view?batch=${batch}&term=${term}&admissionNo=${admissionNo}`;
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForTimeout(1000); // this is now deprecated
    const tempPdfPath = path.join(tempDir, `${admissionNo}.pdf`);
    await page.emulateMediaType("print");
    await page.pdf({
      path: tempPdfPath,
      format: "A4",
      margin: {
        top: "15mm",
        right: "15mm",
        bottom: "15mm",
        left: "15mm",
      },
    });

    downloadedPDFs.push(tempPdfPath);

    progressBar.style.width = `${(current / total) * 100}%`;
    current++;
  }

  progressText.innerText = "Merging PDFS...";
  current = 0;
  // Merge PDFs
  const mergedPdf = await PDFDocument.create();
  for (const pdfPath of downloadedPDFs) {
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));

    progressBar.style.width = `${(current / total) * 100}%`;
    current++;
  }

  // Save merged PDF
  const mergedPdfBytes = await mergedPdf.save();
  const savePath = await ipcRenderer.invoke("show-save-dialog", {
    title: "Save Merged PDF",
    defaultPath: "merged_results.pdf",
    filters: [{ name: "PDF", extensions: ["pdf"] }],
  });

  if (savePath) {
    fs.writeFileSync(savePath, mergedPdfBytes);
    console.log(`Merged PDF saved at ${savePath}`);
  } else {
    console.log("PDF save was cancelled");
  }

  // Clean up
  progressText.innerText = "Cleaning Up";
  downloadedPDFs.forEach((pdf) => fs.unlinkSync(pdf));
  fs.rmdirSync(tempDir);

  await browser.close();

  modal.style.display = "none";
  submitBtn.disabled = false;
  alert("Download Complete!");
}
