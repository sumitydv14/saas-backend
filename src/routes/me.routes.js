import { Router } from "express";
import  authMiddleware  from "../middlewares/auth.middleware.js";
import { usageLimitMiddleware } from "../middlewares/usage.middleware.js";

const router = Router();

router.get("/", authMiddleware, usageLimitMiddleware, (req, res) => {
    res.json({
        message: "Protected data accessed successfully!",
        user: req.user
    })
});

export default router;