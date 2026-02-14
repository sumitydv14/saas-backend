
import express from "express";
import cros from "cors";
import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import meRoutes from "./routes/me.routes.js";
import subscriptionRoutes from "./modules/subscription/subscription.routes.js";

const app = express();
app.use(express.json());
app.use(cros());

app.use("/health", healthRoutes);
app.use("/auth", authRoutes);
app.use("/me", meRoutes);
app.use("/subscription", subscriptionRoutes);


export default app;
