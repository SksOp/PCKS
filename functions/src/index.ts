import { initializeApp } from "firebase-admin/app";
initializeApp();
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import express from "express";
import { setGlobalOptions } from "firebase-functions/v2";
import { studentRoutes, resultRoutes } from "./routes";


// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 10 });

const app = express();

app.get("/student", studentRoutes);
app.get("/result", resultRoutes);

export const api = onRequest(app);
