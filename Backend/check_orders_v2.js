const pool = require('./src/config/db');

async function check() {
  try {
    const [rows] = await pool.query("DESCRIBE orders");
    const statusCol = rows.find(r => r.Field === 'status');
    console.log("STATUS COLUMN FULL TYPE:", statusCol.Type);
    
    // Also check if there's any case sensitivity issues in the DB query
    const [testRow] = await pool.query("SELECT id, status FROM orders LIMIT 1");
    if (testRow.length > 0) {
        console.log("EXAMPLE ORDER STATUS FROM DB:", testRow[0].status);
    }
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
check();
