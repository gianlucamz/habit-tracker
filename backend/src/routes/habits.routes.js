import { Router } from "express";
import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} from "../controllers/habits.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getHabits);
router.post("/", createHabit);
router.put("/:id", updateHabit);
router.delete("/:id", deleteHabit);

export default router;
