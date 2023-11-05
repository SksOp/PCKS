import { initializeApp } from "firebase/app";
import { FIREBASE_API } from "src/config";
import { getStorage } from "firebase/storage";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

export const firebaseApp = initializeApp(FIREBASE_API);

export const DB = getFirestore(firebaseApp);

const isDev = process.env.NODE_ENV === "development";

export const STUDENTS_COLLECTION = isDev ? "students-dev" : "students";
export const RESULTS_COLLECTION = isDev ? "results-dev" : "results";

export const studentsCollection = collection(DB, STUDENTS_COLLECTION);
export const resultsCollection = collection(DB, RESULTS_COLLECTION);
