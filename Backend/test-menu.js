const mysql = require('mysql2/promise');
require('dotenv').config();

async function test() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'qrave',
  });

  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.name as category 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.id DESC
    `);
    console.log("Menu Query Success. Rows:", rows.length);
  } catch (err) {
    console.error("Menu Query Error:", err);
  }

  try {
    const [rows] = await pool.query(`
      SELECT o.*, t.table_number 
      FROM orders o 
      LEFT JOIN restaurant_tables t ON o.table_id = t.id 
      ORDER BY o.created_at DESC LIMIT 1
    `);
    console.log("Orders Query Success");
  } catch (err) {
    console.error("Orders Query Error:", err);
  }

  pool.end();
}
test();
