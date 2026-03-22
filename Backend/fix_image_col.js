const pool = require('./src/config/db');

async function fix() {
  try {
    await pool.query("ALTER TABLE products MODIFY image LONGTEXT");
    console.log("Products table image modified to LONGTEXT");

    await pool.query("ALTER TABLE categories MODIFY image LONGTEXT");
    console.log("Categories table image modified to LONGTEXT");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

fix();
