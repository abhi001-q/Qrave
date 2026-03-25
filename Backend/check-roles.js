const mysql = require('mysql2/promise');
require('dotenv').config();
const fs = require('fs');

async function check() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'qrave',
  });

  try {
    const [rows] = await pool.query('SELECT id, email, role FROM users');
    fs.writeFileSync('db_users.json', JSON.stringify(rows, null, 2));
    console.log("Wrote db_users.json");
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
check();
