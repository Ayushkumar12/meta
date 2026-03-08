import Blog from './models/Blog.js';
import jwt from 'jsonwebtoken';
import Admin from './models/Admin.js';
import Contact from './models/Contact.js';
import { v2 as cloudinary } from 'cloudinary';

// --- Auth Controllers ---
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

export const setup = async (req, res) => {
    try {
        if (await Admin.countDocuments() > 0) return res.status(400).json({ success: false, message: 'Setup completed' });
        await Admin.create({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, name: 'System Admin', role: 'admin' });
        res.status(201).json({ success: true, message: 'Admin account seeded!' });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email }).select('+password');
        if (!admin || !(await admin.matchPassword(password))) return res.status(401).json({ success: false, message: 'Invalid credentials' });
        res.status(200).json({ success: true, token: generateToken(admin._id), admin: { id: admin._id, email: admin.email, name: admin.name, role: admin.role } });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const getMe = async (req, res) => {
    try { res.status(200).json({ success: true, admin: await Admin.findById(req.user.id) }); }
    catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const createUser = async (req, res) => {
    try {
        if (await Admin.findOne({ email: req.body.email })) return res.status(400).json({ success: false, message: 'User exists' });
        const user = await Admin.create(req.body);
        res.status(201).json({ success: true, user });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// --- Blog Controllers ---
export const getBlogs = async (req, res) => {
    try {
        const query = req.query.published ? { published: req.query.published === 'true' } : {};
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const blogs = await Blog.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        const total = await Blog.countDocuments(query);
        res.status(200).json({ success: true, blogs, pagination: { total, pages: Math.ceil(total / limit) } });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const getBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });
        if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, blog });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const createBlog = async (req, res) => {
    try { res.status(201).json({ success: true, blog: await Blog.create(req.body) }); }
    catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

export const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!blog) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, blog });
    } catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

export const deleteBlog = async (req, res) => {
    try {
        if (!await Blog.findByIdAndDelete(req.params.id)) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'Deleted' });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// --- Contact Controllers ---
export const submitContact = async (req, res) => {
    try { res.status(201).json({ success: true, contact: await Contact.create(req.body) }); }
    catch (err) { res.status(400).json({ success: false, message: err.message }); }
};

export const getContacts = async (req, res) => {
    try {
        const query = req.query.unread === 'true' ? { read: false } : {};
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const contacts = await Contact.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
        res.status(200).json({ success: true, contacts, total: await Contact.countDocuments(query), unread: await Contact.countDocuments({ read: false }) });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const markRead = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, contact });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const markReplied = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, { replied: true, read: true }, { new: true });
        if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, contact });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

export const deleteContact = async (req, res) => {
    try {
        if (!await Contact.findByIdAndDelete(req.params.id)) return res.status(404).json({ success: false, message: 'Not found' });
        res.status(200).json({ success: true, message: 'Deleted' });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// --- Upload Controllers ---
export const uploadImage = async (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file' });
    res.status(200).json({ success: true, url: req.file.path, publicId: req.file.filename });
};

export const deleteImage = async (req, res) => {
    try {
        if (!req.body.publicId) return res.status(400).json({ success: false, message: 'No publicId' });
        await cloudinary.uploader.destroy(req.body.publicId);
        res.status(200).json({ success: true, message: 'Deleted' });
    } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// --- Misc ---
export const ping = (req, res) => res.status(200).json({ success: true, message: 'Pong!' });
export const getData = (req, res) => res.status(200).json({ success: true, data: { name: 'MetaCode', version: '1.0.0' } });
