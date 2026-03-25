const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixRoles() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'qrave',
  });

  try {
    // 1. Check Table Schema
    const [schema] = await pool.query("DESCRIBE users");

    // Check if the 'role' column has a default value of 'manager'
    const roleCol = schema.find(c => c.Field === 'role');
    if (roleCol && roleCol.Default === 'manager') {
      console.log("WARNING: Database column 'role' defaults to 'manager'. Modifying to 'user'.");
      await pool.query("ALTER TABLE users MODIFY COLUMN role ENUM('user', 'manager', 'admin') DEFAULT 'user'");
      console.log("Database default altered to 'user'.");
    }

    // Update matching emails
    const [{ affectedRows }] = await pool.query("UPDATE users SET role = 'user' WHERE email LIKE '%goswami%' OR email LIKE '%girisuprim%' OR email LIKE '%ff@gmail.com'");
    console.log(`Updated ${affectedRows} rows to 'user'.`);
    
    // Safety check that manager is still manager
    await pool.query("UPDATE users SET role = 'manager' WHERE email = 'manager@qrave.com'");

  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
fixRoles();
