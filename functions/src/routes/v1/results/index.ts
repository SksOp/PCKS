import { Router } from "express";
import controller from "../../../controllers";

const router = Router();
router.post("/create-term", controller.v1.createTerm);
export default router;
