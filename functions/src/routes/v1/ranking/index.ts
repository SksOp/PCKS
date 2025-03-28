import { Router } from "express";
import controller from "../../../controllers";

const router = Router();
// https://127.0.0.1:5001/pcksstm/us-central1/api/v1/ranking/2024/annual/1
router.get("/:batch/:term/:class", controller.v1.rankingController);
export default router;
