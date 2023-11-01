import { Router } from "express";
import { handleResult } from "../../controllers";

const router = Router();
router.post("/add", handleResult);
export default router;
