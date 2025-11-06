// server/server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const Database = require('better-sqlite3');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'contacts.db');

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '200kb' }));
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files if present
app.use(express.static(path.join(__dirname, '..')));

// Initialize DB
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Create table if not exists
db.exec(`
CREATE TABLE IF NOT EXISTS contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  paperwork TEXT,
  keys TEXT,
  zipcode TEXT,
  vehicle_type TEXT,
  notes TEXT,
  source TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

// Prepared insert statement
const insertStmt = db.prepare(`
  INSERT INTO contacts (name, email, phone, paperwork, keys, zipcode, vehicle_type, notes, source)
  VALUES (@name,@email,@phone,@paperwork,@keys,@zipcode,@vehicle_type,@notes,@source)
`);

// Basic health endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
    try {
        const data = req.body || {};
        // Basic server-side validation & sanitization
        if (!data.name || !data.email || !data.phone || !data.zipcode || !data.vehicle_type) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const record = {
            name: String(data.name).slice(0, 200),
            email: String(data.email).slice(0, 200),
            phone: String(data.phone).slice(0, 50),
            paperwork: (data.paperwork || '').slice(0, 30),
            keys: (data.keys || '').slice(0, 30),
            zipcode: String(data.zipcode).slice(0, 10),
            vehicle_type: String(data.vehicle_type).slice(0, 50),
            notes: (data.notes || '').slice(0, 2000),
            source: (data.source || 'website').slice(0, 100)
        };

        const info = insertStmt.run(record);

        // Respond with success and inserted id
        res.json({ message: 'Request received', id: info.lastInsertRowid });
    } catch (err) {
        console.error('Failed to process contact', err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Optional: endpoint to list contacts (protected in production — add auth)
app.get('/api/contacts', (req, res) => {
    try {
        const rows = db.prepare('SELECT id, name, email, phone, zipcode, vehicle_type, created_at FROM contacts ORDER BY created_at DESC LIMIT 200').all();
        res.json({ count: rows.length, data: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// fallback to index.html for SPA behavior
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Using DB at ${DB_PATH}`);
});
