import { Router } from "express";
import { login, setup, getMe, createUser } from "../controllers/auth.controller";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/login", login);
router.post("/setup", setup);         // One-time seeding endpoint
router.get("/me", protect, getMe);
router.post("/users", protect, createUser);

export default router;
