const Contact = require('../models/Contact');

// @desc Submit contact form
// @route POST /api/contacts
exports.submitContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ success: true, contact });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc Get all contacts
// @route GET /api/contacts
exports.getContacts = async (req, res) => {
    try {
        const query = {};
        if (req.query.unread === 'true') query.read = false;

        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 10, 100);
        const skip = (page - 1) * limit;

        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Contact.countDocuments(query);
        const unread = await Contact.countDocuments({ read: false });

        res.status(200).json({
            success: true,
            contacts,
            pagination: {
                total,
                unread,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Mark as read
// @route PATCH /api/contacts/:id/read
exports.markRead = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }

        res.status(200).json({ success: true, contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Mark as replied
// @route PATCH /api/contacts/:id/replied
exports.markReplied = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { replied: true, read: true },
            { new: true }
        );

        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }

        res.status(200).json({ success: true, contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc Delete contact
// @route DELETE /api/contacts/:id
exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }

        res.status(200).json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
