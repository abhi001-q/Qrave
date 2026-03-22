const pool = require('./src/config/db');

async function update() {
  try {
    const [result] = await pool.query("UPDATE users SET role = 'MANAGER'");
    console.log(`Updated ${result.affectedRows} users to MANAGER role.`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

update();
