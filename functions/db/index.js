// The Firebase Admin SDK to access Firestore.

const { getFirestore } = require("firebase-admin/firestore");
const { logger } = require("firebase-functions/v1");

const DB = getFirestore();

const isProduction = process.env.NODE_ENV === "production";

const studentsCollectionRef = isProduction ? "students" : "students-dev";
const STUDENTS_COLLECTION = DB.collection(studentsCollectionRef);

const resultsCollectionRef = isProduction ? "results" : "results-dev";
const RESULTS_COLLECTION = DB.collection(resultsCollectionRef);

module.exports = { DB, STUDENTS_COLLECTION, RESULTS_COLLECTION };
