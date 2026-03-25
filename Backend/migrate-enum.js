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
    // Expand the enum for status
    await pool.query("ALTER TABLE orders MODIFY COLUMN status ENUM('pending', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled') DEFAULT 'pending'");
    console.log("Successfully updated orders status enum.");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    pool.end();
  }
}
migrate();
