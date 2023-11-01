import { handleAdmission, handleRollChange } from "@/controllers";
import { Router } from "express";

const router = Router();

router.post("/admission", handleAdmission);
router.post("/change-roll", handleRollChange);

export default router;
