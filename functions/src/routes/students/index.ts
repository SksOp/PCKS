import { Router } from "express";
import { handleAdmission, handleRollChange } from "../../controllers";

const router = Router();

router.post("/admission", handleAdmission);
router.post("/change-roll", handleRollChange);

export default router;
