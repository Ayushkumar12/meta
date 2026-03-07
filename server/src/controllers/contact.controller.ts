import { Request, Response } from "express";
import { Contact } from "../models/Contact";
import { z } from "zod";

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    company: z.string().optional(),
    service: z.string().optional(),
    budget: z.string().optional(),
    message: z.string().min(10),
});

// ── POST /api/contacts ────────────────────────────────────────────────────
// Public route — called from the contact form on the frontend
export async function createContact(req: Request, res: Response) {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ success: false, errors: parsed.error.flatten() });
        return;
    }

    const contact = await Contact.create(parsed.data);
    res.status(201).json({ success: true, contact });
}

// ── GET /api/contacts ─────────────────────────────────────────────────────
// Admin only
export async function getContacts(req: Request, res: Response) {
    const { read, page = "1", limit = "20" } = req.query;

    const query: Record<string, unknown> = {};
    if (read !== undefined) query.read = read === "true";

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const total = await Contact.countDocuments(query);
    const contacts = await Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string));

    res.json({
        success: true,
        contacts,
        pagination: {
            total,
            page: parseInt(page as string),
            pages: Math.ceil(total / parseInt(limit as string)),
            unread: await Contact.countDocuments({ read: false }),
        },
    });
}

// ── PATCH /api/contacts/:id/read ──────────────────────────────────────────
export async function markRead(req: Request, res: Response) {
    const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { read: true },
        { new: true }
    );
    if (!contact) {
        res.status(404).json({ success: false, message: "Contact not found." });
        return;
    }
    res.json({ success: true, contact });
}

// ── PATCH /api/contacts/:id/replied ──────────────────────────────────────
export async function markReplied(req: Request, res: Response) {
    const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { replied: true, read: true },
        { new: true }
    );
    if (!contact) {
        res.status(404).json({ success: false, message: "Contact not found." });
        return;
    }
    res.json({ success: true, contact });
}

// ── DELETE /api/contacts/:id ──────────────────────────────────────────────
export async function deleteContact(req: Request, res: Response) {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
        res.status(404).json({ success: false, message: "Contact not found." });
        return;
    }
    res.json({ success: true, message: "Contact deleted successfully." });
}
