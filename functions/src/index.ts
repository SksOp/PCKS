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

const v1Router = express.Router();

v1Router.use("/student", router.v1.studentRoutes);
v1Router.use("/result", router.v1.resultRoutes);

app.use("/v1", v1Router);

export const api = onRequest(app);
