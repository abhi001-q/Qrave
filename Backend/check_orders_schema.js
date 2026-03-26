const pool = require('./src/config/db');

async function check() {
  try {
    const [rows] = await pool.query("DESCRIBE orders");
    console.log(JSON.stringify(rows, null, 2));
    const statusCol = rows.find(r => r.Field === 'status');
    console.log("STATUS COLUMN TYPE:", statusCol.Type);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
check();
