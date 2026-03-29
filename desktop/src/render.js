// removed puppeteer
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

  const isDevelopment = false
  const baseURL = isDevelopment
    ? "http://localhost:3000"
    : "https://pcksstm.web.app";

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "my-app-"));
  const downloadedPDFs = [];

  const total = results.length;
  let current = 0;
  progressText.innerText = "Making PDFS...";

  for (const result of results) {
    const { id: admissionNo, isCompleted } = result;
    if (!isCompleted) continue;
    const url = `${baseURL}/dashboard/result/view?batch=${batch}&term=${term}&admissionNo=${admissionNo}`;
    
    // For local development, Gotenberg runs inside a Docker container
    // It needs to access the host machine's localhost via host.docker.internal
    let gotenbergTargetUrl = url;
    if (gotenbergTargetUrl.includes("http://localhost")) {
      gotenbergTargetUrl = gotenbergTargetUrl.replace("http://localhost", "http://host.docker.internal");
    }
    
    // Use Gotenberg API to convert URL to PDF
    const gotenbergUrl = process.env.REACT_APP_GOTENBERG_URL || "http://localhost:3030";
    
    const formData = new FormData();
    formData.append("url", gotenbergTargetUrl);
    formData.append("paperWidth", "8.27");   // A4 width in inches
    formData.append("paperHeight", "11.69"); // A4 height in inches
    formData.append("marginTop", "0.59");    // 15mm in inches
    formData.append("marginBottom", "0.59");
    formData.append("marginLeft", "0.59");
    formData.append("marginRight", "0.59");
    formData.append("emulatedMediaType", "print");
    formData.append("waitDelay", "1s"); // Wait for network idle
    
    const response = await fetch(`${gotenbergUrl}/forms/chromium/convert/url`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to generate PDF for ${admissionNo}:`, errorText);
      throw new Error(`Gotenberg Error: ${response.statusText}`);
    }

    const tempPdfPath = path.join(tempDir, `${admissionNo}.pdf`);
    const arrayBuffer = await response.arrayBuffer();
    fs.writeFileSync(tempPdfPath, Buffer.from(arrayBuffer));

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

  modal.style.display = "none";
  submitBtn.disabled = false;
  alert("Download Complete!");
}
