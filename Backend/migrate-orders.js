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
    const columns = schema.map(c => c.Field);
    
    if (!columns.includes("orderType")) {
      await pool.query("ALTER TABLE orders ADD COLUMN orderType VARCHAR(50) DEFAULT 'Dine-in'");
      console.log("Added orderType column.");
    }
    
    if (!columns.includes("paymentMethod")) {
      await pool.query("ALTER TABLE orders ADD COLUMN paymentMethod VARCHAR(50) DEFAULT 'CASH'");
      console.log("Added paymentMethod column.");
    }

    if (!columns.includes("delivery_location")) {
      await pool.query("ALTER TABLE orders ADD COLUMN delivery_location VARCHAR(255) NULL");
      console.log("Added delivery_location column.");
    }

    if (!columns.includes("delivery_zip")) {
      await pool.query("ALTER TABLE orders ADD COLUMN delivery_zip VARCHAR(50) NULL");
      console.log("Added delivery_zip column.");
    }

    console.log("Orders table migration complete.");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    pool.end();
  }
}

migrate();
