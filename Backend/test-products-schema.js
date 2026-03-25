const mysql = require('mysql2/promise');
require('dotenv').config();

async function check() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'qrave',
  });

  try {
    const [schema] = await pool.query("DESCRIBE products");
    console.log("Products table columns:");
    console.log(schema.map(c => c.Field).join(", "));
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

check();
