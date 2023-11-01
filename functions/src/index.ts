import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import express from "express";
import { initializeApp } from "firebase-admin/app";
import { setGlobalOptions } from "firebase-functions/v2";
import { studentRoutes } from "@/routes";

initializeApp();
// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 10 });

const app = express();

app.get("/student", studentRoutes);

export const api = onRequest(app);
