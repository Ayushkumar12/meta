const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

/**
 * @desc First-time setup (Seeds the admin account)
 * @route POST /api/auth/setup
 */
exports.setup = async (req, res) => {
    try {
        const count = await Admin.countDocuments();
        if (count > 0) {
            return res.status(400).json({ success: false, message: 'Setup already completed' });
        }

        const admin = await Admin.create({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            name: 'System Admin',
            role: 'admin'
        });

        res.status(201).json({
            success: true,
            message: 'Admin account seeded successfully!'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc Admin Login
 * @route POST /api/auth/login
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const admin = await Admin.findOne({ email }).select('+password');

        if (!admin || !(await admin.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(admin._id);

        res.status(200).json({
            success: true,
            token,
            admin: {
                id: admin._id,
                email: admin.email,
                name: admin.name,
                role: admin.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc Get current admin
 * @route GET /api/auth/me
 * @access Private
 */
exports.getMe = async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id);
        res.status(200).json({ success: true, admin });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * @desc Create new user
 * @route POST /api/auth/users
 * @access Private
 */
exports.createUser = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;

        const existing = await Admin.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await Admin.create({ email, password, name, role });
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
