const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

const serviceAccount = require("./service_key.json");

initializeApp({
  credential: cert(serviceAccount),
});

const DB = getFirestore();

DB.settings({
  ignoreUndefinedProperties: true,
});

const isDevelopment = process.env.NODE_ENV === "development";

const studentsCollection = !isDevelopment ? "students" : "students-dev";
const STUDENTS_COLLECTION_REF = DB.collection(studentsCollection);

const resultsCollection = !isDevelopment ? "results" : "results-dev";
const RESULTS_COLLECTION_REF = DB.collection(resultsCollection);

const managementCollection = !isDevelopment ? "management" : "management-dev";
const MANAGEMENT_COLLECTION_ref = DB.collection(managementCollection);

module.exports = {
  DB,
  STUDENTS_COLLECTION_REF,
  RESULTS_COLLECTION_REF,
  MANAGEMENT_COLLECTION_ref,
  studentsCollection,
  resultsCollection,
  managementCollection,
};
