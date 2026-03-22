const pool = require('./src/config/db');
const fs = require('fs');

async function check() {
  try {
    const [rows] = await pool.query("DESCRIBE bookings");
    fs.writeFileSync('schema.json', JSON.stringify(rows, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
check();
