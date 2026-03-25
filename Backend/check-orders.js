const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkOrders() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'qrave',
  });

  try {
    const [schema] = await pool.query("DESCRIBE orders");
    console.log("Orders columns:", schema.map(c => c.Field).join(", "));
    
    const [orders] = await pool.query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 5");
    console.log("Latest orders count:", orders.length);
    if (orders.length > 0) {
      console.log("Sample order:", JSON.stringify(orders[0], null, 2));
    }

    const [users] = await pool.query("DESCRIBE users");
    console.log("Users columns:", users.map(c => c.Field).join(", "));
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

checkOrders();
