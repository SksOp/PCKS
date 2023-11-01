import { handleAdmission } from "@/controllers";
import { Router } from "express";

const router = Router();
router.post("/admission", handleAdmission);

export default router;
