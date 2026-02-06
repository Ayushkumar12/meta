const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('MetaCode API is running');
});

app.post('/api/contact', (req, res) => {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const sql = `INSERT INTO contacts (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)`;
    const params = [name, email, phone, service, message];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            return res.status(500).json({ error: 'Failed to save contact form data.' });
        }

        res.status(201).json({
            message: 'Contact form submitted successfully.',
            id: result.insertId
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
