import { getFirestore } from "firebase-admin/firestore";

export const DB = getFirestore();

DB.settings({
  ignoreUndefinedProperties: true,
});

const isProduction = process.env.NODE_ENV === "production";

export const studentsCollection = isProduction ? "students" : "students-dev";
export const STUDENTS_COLLECTION = DB.collection(studentsCollection);

export const resultsCollection = isProduction ? "results" : "results-dev";
export const RESULTS_COLLECTION = DB.collection(resultsCollection);

export const managementCollection = isProduction
  ? "management"
  : "management-dev";
export const MANAGEMENT_COLLECTION = DB.collection(managementCollection);
