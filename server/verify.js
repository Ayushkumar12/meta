const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function postRequest() {
    const data = JSON.stringify({
        name: 'Verification User',
        email: 'verify@example.com',
        message: 'This is a verification message',
        service: 'Web Development'
    });

    const options = {
        hostname: 'http://test.metacode.co.in',
        port: 3000,
        path: '/api/contact',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log(`Status Code: ${res.statusCode}`);
            console.log('Response Body:', body);

            if (res.statusCode === 201) {
                checkDatabase();
            } else {
                console.error('API Request Failed');
                process.exit(1);
            }
        });
    });

    req.on('error', (error) => {
        console.error('Request Error:', error);
        process.exit(1);
    });

    req.write(data);
    req.end();
}

function checkDatabase() {
    const dbPath = path.resolve(__dirname, 'database.sqlite');
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
        if (err) {
            console.error('Error opening database for verification:', err.message);
            process.exit(1);
        }
    });

    db.get("SELECT * FROM contacts ORDER BY id DESC LIMIT 1", (err, row) => {
        if (err) {
            console.error('Error querying database:', err.message);
            process.exit(1);
        }

        if (row && row.email === 'verify@example.com') {
            console.log('Database verification SUCCESS: Found inserted record:', row);
            process.exit(0);
        } else {
            console.error('Database verification FAILED: Record not found or mismatch.', row);
            process.exit(1);
        }
    });
}

// Wait a bit for server to start if running immediately
setTimeout(postRequest, 2000);
