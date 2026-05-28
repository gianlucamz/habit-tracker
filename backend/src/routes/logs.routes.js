import { Router } from "express";
import { toggleLog, getLogs, getStreak } from "../controllers/logs.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/:habitId", getLogs);
router.post("/:habitId/toggle", toggleLog);
router.get("/:habitId/streak", getStreak);

export default router;
