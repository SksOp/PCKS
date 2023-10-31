const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { initializeApp } = require("firebase-admin/app");
initializeApp();

const express = require("express");
const { DB } = require("./db");

const app = express();

// configure the express app
app.get("/", async (req, res) => {
  const data = {
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912,
  };
  const aTuringRef = DB.collection("users").doc("aturing2");

  await aTuringRef.set(data);
  logger.log("Created document with ID: ", aTuringRef.id);
  res.send("Hello from Firebase!");
});

// export the express app as an HTTP function
exports.api = onRequest(app);
