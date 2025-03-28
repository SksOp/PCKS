import { Router } from "express";
import controller from "../../../controllers";

const router = Router();
router.post("/create-term", controller.v1.createTerm);
router.post("/create-result", controller.v1.createResult);
router.post(
  "/create-term-result-for-student",
  controller.v1.createTermResultForStudent
);
export default router;
