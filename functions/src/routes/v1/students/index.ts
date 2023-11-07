import { Router } from "express";
import controller from "../../../controllers";

const router = Router();

router.post("/admission/", controller.v1.handleAdmission);
router.post("/update/:admissionNo", controller.v1.handleStudentUpdate);
router.get(
  "/check-availability/:admissionNo",
  controller.v1.getAdmissionNoAvaibility
);
router.delete(
  "/unregister/:admissionNo",
  controller.v1.handleUnregisterStudentRequest
);
export default router;
