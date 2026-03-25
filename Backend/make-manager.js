const mysql = require('mysql2/promise');
require('dotenv').config();

async function makeManager() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'qrave',
  });

  try {
    const email = 'abhishek987ff@gmail.com';
    const [result] = await pool.query(
      "UPDATE users SET role = 'manager' WHERE email = ?",
      [email]
    );

    if (result.affectedRows > 0) {
      console.log(`Success! ${email} has been promoted to manager.`);
    } else {
      console.log(`Hmm, couldn't find ${email} in the database.`);
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    pool.end();
  }
}

makeManager();
