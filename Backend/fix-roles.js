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
    console.log("=== USERS TABLE SCHEMA ===");
    console.log(JSON.stringify(schema, null, 2));

    // 2. Fix admin accounts
    await pool.query("UPDATE users SET role = 'admin' WHERE email LIKE 'admin%'");
    console.log("Updated admin accounts to 'admin' role.");

    // 3. Fix regular user accounts (the ones the user mentioned, plus standard user@)
    const userEmails = [
      'user@qrave.com',
      'abhigoswami@gmail.com',
      'abigoswami987ff@gmail.com',
      'abigoswami987@gmail.com',
      'girisuprim4@gmail.com',
      'rubilimbu118@gmail.com',
      'abhishek987ff@gmail.com',
      'abhishek98ff@gmail.com',
      'nihesh@gmail.com',
      'chdtra87@gmail.com'
    ];
    
    // Convert these to users.
    for (const email of userEmails) {
      await pool.query("UPDATE users SET role = 'user' WHERE email = ?", [email]);
    }
    console.log("Updated specific customer accounts back to 'user' role.");

    const [rows] = await pool.query('SELECT id, email, role FROM users');
    console.log("=== NEW ROLES ===");
    console.log(JSON.stringify(rows, null, 2));

  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
fixRoles();
