const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { initializeApp } = require("firebase-admin/app");
initializeApp();

const express = require("express");
const { DB, STUDENTS_COLLECTION } = require("./db");

const app = express();

// configure the express app
app.post("/add-data", async (req, res) => {
  const {
    name,
    fatherName,
    motherName,
    admissionNo,
    admissionyear,
    admissionclass,
    currentClass,
    crrentSection,
  } = req.body;
  const aTuringRef = STUDENTS_COLLECTION.doc("aturing");
  try {
    await aTuringRef.set(
      {
        name,
        fatherName,
        motherName,
        admissionNo,
        admissionyear,
        currentClass,
        admissionclass,
        crrentSection,
      },
      { merge: true }
    );
    res.status(200).json({ message: "Document updated successfully." });
  } catch (err) {
    console.log("Error Created on Updating Document", err);
    res.status(500).json({ error: err });
  }
});
// export the express app as an HTTP function
exports.api = onRequest(app);
