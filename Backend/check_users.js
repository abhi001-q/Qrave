const pool = require('./src/config/db');

async function check() {
  try {
    const [rows] = await pool.query("SELECT id, name, email, role FROM users");
    console.log("Users in DB:", rows);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

check();
