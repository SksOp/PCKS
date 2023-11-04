import { Router } from "express";
import controller from "../../../controllers";

const router = Router();

router.post("/admission/:admissionNo", controller.v1.handleAdmission);
// router.post("/change-roll", handleRollChange);
router.post("/update/:admissionNo", controller.v1.handleStudentUpdate);
router.get(
  "/check-availability/:admissionNo",
  controller.v1.getAdmissionNoAvaibility
);
export default router;
