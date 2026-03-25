const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'qrave',
  });

  try {
    const [schema] = await pool.query("DESCRIBE orders");
    const cols = schema.map(c => c.Field);
    console.log("Current columns:", cols.join(", "));

    // If old camelCase columns exist, copy data and drop them
    if (cols.includes('orderType') && cols.includes('order_type')) {
      await pool.query("UPDATE orders SET order_type = orderType WHERE order_type IS NULL AND orderType IS NOT NULL");
      await pool.query("ALTER TABLE orders DROP COLUMN orderType");
      console.log("Migrated orderType -> order_type and dropped old column.");
    } else if (cols.includes('orderType') && !cols.includes('order_type')) {
      await pool.query("ALTER TABLE orders CHANGE COLUMN orderType order_type VARCHAR(50) DEFAULT 'Dine-in'");
      console.log("Renamed orderType -> order_type.");
    }

    if (cols.includes('paymentMethod') && cols.includes('payment_method')) {
      await pool.query("UPDATE orders SET payment_method = paymentMethod WHERE payment_method IS NULL AND paymentMethod IS NOT NULL");
      await pool.query("ALTER TABLE orders DROP COLUMN paymentMethod");
      console.log("Migrated paymentMethod -> payment_method and dropped old column.");
    } else if (cols.includes('paymentMethod') && !cols.includes('payment_method')) {
      await pool.query("ALTER TABLE orders CHANGE COLUMN paymentMethod payment_method VARCHAR(50) DEFAULT 'CASH'");
      console.log("Renamed paymentMethod -> payment_method.");
    }

    // Verify final schema
    const [newSchema] = await pool.query("DESCRIBE orders");
    console.log("Final columns:", newSchema.map(c => c.Field).join(", "));

    // Show latest orders
    const [orders] = await pool.query("SELECT id, status, order_type, payment_method, total_amount, created_at FROM orders ORDER BY created_at DESC LIMIT 5");
    console.log("Latest orders:", JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    pool.end();
  }
}

migrate();
