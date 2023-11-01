import { Router } from "express";
import {
  handleAdmission,
  handleRollChange,
  handleSectionChange,
  handleClassChange,
  handleNameChange,
} from "../../controllers";

const router = Router();

router.post("/admission", handleAdmission);
router.post("/change-roll", handleRollChange);
router.post("/change-section", handleSectionChange);
router.post("/change-class", handleClassChange);
router.post("/change-name", handleNameChange);

export default router;
