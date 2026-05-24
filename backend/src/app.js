import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import habitsRoutes from "./routes/habits.routes.js";
import logsRoutes from "./routes/logs.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/habits", habitsRoutes);
app.use("/logs", logsRoutes);

app.use(errorMiddleware);

export default app;
