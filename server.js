import express from 'express';
import pg from 'pg';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure PostgreSQL connection
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize database table
async function initDb() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS responses (
        id SERIAL PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized');
  } catch (err) {
    console.error('Error initializing DB:', err);
  }
}

// Only initialize DB if DATABASE_URL is provided (avoids crash locally if not set yet)
if (process.env.DATABASE_URL) {
  initDb();
} else {
  console.warn('WARNING: DATABASE_URL is not set. Database will not be initialized.');
}

app.post('/api/save', async (req, res) => {
  try {
    const data = req.body;
    const result = await pool.query(
      'INSERT INTO responses (data) VALUES ($1) RETURNING id',
      [data]
    );
    res.status(200).json({ ok: true, id: result.rows[0].id });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ ok: false, error: 'Could not save' });
  }
});

app.get('/api/responses', async (req, res) => {
  const { password } = req.query;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminPassword && password !== adminPassword) {
    return res.status(401).json({ error: 'Mot de passe incorrect' });
  }

  try {
    const result = await pool.query('SELECT * FROM responses ORDER BY created_at DESC');
    // Map rows to match the old expected format: array of JSON data
    const responses = result.rows.map(row => row.data);
    res.status(200).json({ ok: true, responses });
  } catch (err) {
    console.error('List error:', err);
    res.status(500).json({ ok: false, error: 'Could not load' });
  }
});

// Fallback to index.html for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
