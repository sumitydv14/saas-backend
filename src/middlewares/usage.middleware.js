import prisma from "../config/prisma.js";

export const usageLimitMiddleware = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const subscription = await prisma.subscription.findUnique({
            where: { userId },
            include: { plan: true }
        });

        if (!subscription || subscription.status !== "active") {
            return res.status(403).json({ error: "No active subscription found" });
        }
        const planLimit = subscription.plan.requestLimit;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const usage = await prisma.apiUsage.upsert({
            where: {
                userId_date: {
                    userId,
                    date: today,
                },
            },
            update: {
                count: { increment: 1 },
            },
            create: {
                userId,
                date: today,
                count: 1,
            },
        });

        if (usage.count > planLimit) {
            return res.status(429).json({
                error: "API request limit exceeded for today",
                limit: planLimit,
            });
        }
        next();
    } catch (error) {
        console.error("Usage limit middleware error:", error);
        return res.status(500).json({ error: "Usage check failed" });
    }
}