const mysql = require('mysql2/promise');
require('dotenv').config();

async function testUpdate() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'qrave',
  });
  
  try {
    // First check current status of order 20
    const [before] = await pool.query("SELECT id, status FROM orders WHERE id IN (19, 20)");
    console.log("Before:", before);
    
    // Try direct SQL update
    const [result] = await pool.query("UPDATE orders SET status = ? WHERE id = ?", ['preparing', 20]);
    console.log("Affected rows:", result.affectedRows);
    
    const [after] = await pool.query("SELECT id, status FROM orders WHERE id IN (19, 20)");
    console.log("After:", after);
  } catch(err) {
    console.error("Error:", err);
  } finally {
    pool.end();
  }
}
testUpdate();
