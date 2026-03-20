const pool = require("../../config/db");

exports.up = async () => {
  await pool.query(`
    ALTER TABLE users 
    ADD COLUMN otp_code VARCHAR(10) DEFAULT NULL,
    ADD COLUMN otp_expires TIMESTAMP DEFAULT NULL;
  `);
  console.log("✅ OTP columns added to users table");
};

exports.down = async () => {
  await pool.query(`
    ALTER TABLE users 
    DROP COLUMN otp_code,
    DROP COLUMN otp_expires;
  `);
  console.log("🗑️  OTP columns removed from users table");
};
