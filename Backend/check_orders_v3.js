const pool = require('./src/config/db');
const fs = require('fs');

async function check() {
  try {
    const [rows] = await pool.query("DESCRIBE orders");
    const statusCol = rows.find(r => r.Field === 'status');
    const output = `STATUS COLUMN FULL TYPE: ${statusCol.Type}\n`;
    fs.writeFileSync('schema_final.txt', output, 'utf8');
    console.log("Written to schema_final.txt");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
check();
