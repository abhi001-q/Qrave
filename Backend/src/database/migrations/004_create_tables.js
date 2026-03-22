const pool = require("../../config/db");

exports.up = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS restaurant_tables (
      id          INT           AUTO_INCREMENT PRIMARY KEY,
      table_number INT          NOT NULL UNIQUE,
      capacity    INT           NOT NULL DEFAULT 2,
      status      ENUM('Available', 'Occupied', 'Reserved') NOT NULL DEFAULT 'Available',
      created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
      updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log("✅ tables table created");
};

exports.down = async () => {
  await pool.query("DROP TABLE IF EXISTS restaurant_tables");
  console.log("🗑️  tables table dropped");
};
