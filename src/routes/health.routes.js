import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "SaaS Backend is running successfully!"
    })
})

export default router;