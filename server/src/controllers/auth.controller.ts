import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
    role: z.enum(["admin", "editor"]),
});

// ── POST /api/auth/login ─────────────────────────────────────────────────────
export async function login(req: Request, res: Response): Promise<void> {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ success: false, message: "Invalid credentials format." });
        return;
    }

    const { email, password } = parsed.data;

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin || !(await admin.comparePassword(password))) {
        res.status(401).json({ success: false, message: "Invalid email or password." });
        return;
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    } as jwt.SignOptions);

    res.json({
        success: true,
        token,
        admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role || "admin" },
    });
}

// ── POST /api/auth/setup ─────────────────────────────────────────────────────
// Seeds the first admin account from env vars (call only once)
export async function setup(req: Request, res: Response) {
    const exists = await Admin.findOne({});
    if (exists) {
        res.status(400).json({ success: false, message: "Admin already set up." });
        return;
    }

    const admin = await Admin.create({
        email: process.env.ADMIN_EMAIL || "admin@metacode.com",
        password: process.env.ADMIN_PASSWORD || "Admin@1234",
        name: "Admin",
    });

    res.status(201).json({ success: true, message: "Admin account created.", admin: { email: admin.email } });
}

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
export async function getMe(req: Request & { adminId?: string }, res: Response): Promise<void> {
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
        res.status(404).json({ success: false, message: "Admin not found." });
        return;
    }
    res.json({ success: true, admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role || "admin" } });
}

// ── POST /api/auth/users ─────────────────────────────────────────────────────
export async function createUser(req: Request & { adminId?: string }, res: Response): Promise<void> {
    const requester = await Admin.findById(req.adminId);
    if (!requester || requester.role !== "admin") {
        res.status(403).json({ success: false, message: "Forbidden: Only admins can create users." });
        return;
    }

    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ success: false, message: "Invalid data format." });
        return;
    }

    const { email, password, name, role } = parsed.data;

    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
        res.status(400).json({ success: false, message: "User with this email already exists." });
        return;
    }

    const newUser = await Admin.create({ email, password, name, role });
    res.status(201).json({ success: true, user: { id: newUser._id, email: newUser.email, name: newUser.name, role: newUser.role } });
}
