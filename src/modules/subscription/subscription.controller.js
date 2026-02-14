import prisma from "../../config/prisma.js";

export const upgradeToPro = async (req, res) => {
  try {
    const userId = req.user.id;

    const proPlan = await prisma.plan.findUnique({
      where: { name: "PRO" },
    });

    if (!proPlan) {
      return res.status(404).json({ message: "PRO plan not found" });
    }

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    if (subscription.planId === proPlan.id) {
      return res.json({ message: "Already on PRO plan" });
    }

    await prisma.subscription.update({
      where: { userId },
      data: {
        planId: proPlan.id,
        status: "active",
      },
    });

    res.json({
      error: "Successfully upgraded to PRO",
      plan: "PRO",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Upgrade failed" });
  }
};
