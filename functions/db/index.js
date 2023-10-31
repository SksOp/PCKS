// The Firebase Admin SDK to access Firestore.

const { getFirestore } = require("firebase-admin/firestore");
const { logger } = require("firebase-functions/v1");

const db = getFirestore();
logger.log("Firestore initialized");
module.exports = db;
