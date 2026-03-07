import { Router } from "express";
import {
    createContact,
    getContacts,
    markRead,
    markReplied,
    deleteContact,
} from "../controllers/contact.controller";
import { protect } from "../middleware/auth";

const router = Router();

// Public — contact form submission
router.post("/", createContact);

// Admin only
router.get("/", protect, getContacts);
router.patch("/:id/read", protect, markRead);
router.patch("/:id/replied", protect, markReplied);
router.delete("/:id", protect, deleteContact);

export default router;
