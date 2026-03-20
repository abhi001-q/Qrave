const pool = require("./src/config/db");
const migration = require("./src/database/migrations/010_add_otp_to_users");

async function run() {
  try {
    console.log("Starting migration...");
    await migration.up();
    console.log("Migration successful!");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

run();
