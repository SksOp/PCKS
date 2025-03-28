import { initializeApp } from "firebase-admin/app";
initializeApp();
import { onRequest } from "firebase-functions/v2/https";
import express from "express";
import { setGlobalOptions } from "firebase-functions/v2";
import router from "./routes";
import cors from "cors";
import { managementMiddleware } from "./middleware/management";
// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 10 });

const app = express();
app.use(cors());

//v1 is the version of the API
// its just a normal router

const v1 = express.Router();
v1.use(managementMiddleware);
v1.use("/student", router.v1.studentRoutes);
v1.use("/result", router.v1.resultRoutes);
v1.use("/management", router.v1.managementRoutes);
v1.use("/ranking", router.v1.rankingRoutes);
app.use("/v1", v1);

export const api = onRequest(app);
