const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { initializeApp } = require("firebase-admin/app");
initializeApp();

const express = require("express");

const app = express();

//configure the express app

// export the express app as an HTTP function
exports.api = onRequest(app);
