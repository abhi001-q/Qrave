const pool = require("../../config/db");

exports.up = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id          INT           AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(100)  NOT NULL,
      email       VARCHAR(150)  NOT NULL UNIQUE,
      password    VARCHAR(255)  NOT NULL,
      phone       VARCHAR(20)   DEFAULT NULL,
      role        ENUM('user', 'manager', 'admin') NOT NULL DEFAULT 'user',
      is_active   TINYINT(1)    NOT NULL DEFAULT 1,
      created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
      updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log("✅ users table created");
};

exports.down = async () => {
  await pool.query("DROP TABLE IF EXISTS users");
  console.log("🗑️  users table dropped");
};
