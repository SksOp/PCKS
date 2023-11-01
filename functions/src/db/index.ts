import { getFirestore } from "firebase-admin/firestore";

const DB = getFirestore();

const isProduction = process.env.NODE_ENV === "production";

const studentsCollectionRef = isProduction ? "students" : "students-dev";
export const STUDENTS_COLLECTION = DB.collection(studentsCollectionRef);

const resultsCollectionRef = isProduction ? "results" : "results-dev";
export const RESULTS_COLLECTION = DB.collection(resultsCollectionRef);
