const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
  const pool = mysql.createPool({
    host:     process.env.DB_HOST     || 'localhost',
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME     || 'qrave',
  });
  try {
    const [rows] = await pool.query("DESCRIBE orders");
    console.log(JSON.stringify(rows.filter(r => r.Field === 'status'), null, 2));
  } finally {
    pool.end();
  }
}
check();
