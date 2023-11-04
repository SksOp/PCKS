import { Router } from "express";
import { handleResult } from "../../../controllers/v1";

const router = Router();
router.post("/add", handleResult);
export default router;
