const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
  const pool = mysql.createPool({
    host:     process.env.DB_HOST     || 'localhost',
    user:     process.env.DB_USER     || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME     || 'qrave',
  });
  try {
    // 1. Add transaction_uuid if not exists
    const [cols] = await pool.query("SHOW COLUMNS FROM orders LIKE 'transaction_uuid'");
    if (cols.length === 0) {
      await pool.query("ALTER TABLE orders ADD COLUMN transaction_uuid VARCHAR(255) UNIQUE AFTER payment_method");
      console.log("Added transaction_uuid column to orders table.");
    } else {
      console.log("transaction_uuid column already exists.");
    }

    // 2. Check items column type
    const [itemsCols] = await pool.query("SHOW COLUMNS FROM orders LIKE 'items'");
    console.log("Items column info:", itemsCols[0]);

  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    pool.end();
  }
}
migrate();
