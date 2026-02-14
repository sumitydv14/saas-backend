import { Router } from "express";
import { upgradeToPro } from "./subscription.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/upgrade", authMiddleware, upgradeToPro);

export default router;
