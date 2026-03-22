const pool = require("../../config/db");

exports.up = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id          INT           AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(100)  NOT NULL UNIQUE,
      created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
      updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log("✅ categories table created");
};

exports.down = async () => {
  await pool.query("DROP TABLE IF EXISTS categories");
  console.log("🗑️  categories table dropped");
};
