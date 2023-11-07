import { Router } from "express";
import controller from "../../../controllers";

const router = Router();
router.get("/email-refresh", controller.v1.refreshAllowedEmailsController);
export default router;
