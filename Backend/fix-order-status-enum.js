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
    console.log("Starting migration to fix orders status ENUM...");
    
    // First, let's update any existing data to uppercase to avoid truncation during MODIFY
    await pool.query("UPDATE orders SET status = 'PENDING' WHERE status = 'pending'");
    await pool.query("UPDATE orders SET status = 'PREPARING' WHERE status = 'preparing'");
    await pool.query("UPDATE orders SET status = 'OUT_FOR_DELIVERY' WHERE status = 'out_for_delivery'");
    await pool.query("UPDATE orders SET status = 'DELIVERED' WHERE status = 'delivered'");
    await pool.query("UPDATE orders SET status = 'CANCELLED' WHERE status = 'cancelled'");
    
    // Now expand the enum to include all required states in UPPERCASE
    // We include 'PAID' just in case it was being used for something
    const newEnum = "'PENDING', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'PAID'";
    await pool.query(`ALTER TABLE orders MODIFY COLUMN status ENUM(${newEnum}) DEFAULT 'PENDING'`);
    
    console.log("Successfully updated orders status enum to uppercase and included READY.");
    
    // Verify
    const [rows] = await pool.query("DESCRIBE orders");
    const statusCol = rows.find(r => r.Field === 'status');
    console.log("NEW STATUS COLUMN TYPE:", statusCol.Type);
    
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    pool.end();
  }
}
migrate();
