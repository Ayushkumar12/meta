require('dotenv').config();
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check connection
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    } else {
        console.log('Connected to the MySQL database.');
        // Initialize table if needed - usually better to do this via a migration script or manually for production
        // preventing auto-table creation on every connect for simpler production setup, 
        // but can keep a simple check if desired. 
        // For now, let's keep the table creation simple or assume it exists/user creates it.
        // But the previous code created it on start. Let's replicate that behavior safely.
    }
});

// Export the pool promise for easier async/await usage if desired, or just the pool for callbacks
module.exports = pool;

