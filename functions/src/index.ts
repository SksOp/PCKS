import { initializeApp } from "firebase-admin/app";
initializeApp();
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import express from "express";
import { setGlobalOptions } from "firebase-functions/v2";
import router from "./routes";

// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 10 });

const app = express();

//v1 is the version of the API
// its just a normal router

const v1 = express.Router();

v1.use("/student", router.v1.studentRoutes);
v1.use("/result", router.v1.resultRoutes);

app.use("/v1", v1);

export const api = onRequest(app);
