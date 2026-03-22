const pool = require("../../config/db");

exports.up = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS payments (
      id          INT           AUTO_INCREMENT PRIMARY KEY,
      order_id    INT           NOT NULL,
      amount      DECIMAL(10,2) NOT NULL,
      provider    VARCHAR(100)  DEFAULT NULL,
      status      VARCHAR(50)   NOT NULL DEFAULT 'PENDING',
      created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log("✅ payments table created");
};

exports.down = async () => {
  await pool.query("DROP TABLE IF EXISTS payments");
  console.log("🗑️  payments table dropped");
};
