const pool = require("../../config/db");

exports.up = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bills (
      id          INT           AUTO_INCREMENT PRIMARY KEY,
      order_id    INT           NOT NULL,
      total_amount DECIMAL(10,2) NOT NULL,
      tax_amount  DECIMAL(10,2) NOT NULL DEFAULT 0,
      pdf_url     VARCHAR(255)  NULL,
      created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log("✅ bills table created");
};

exports.down = async () => {
  await pool.query("DROP TABLE IF EXISTS bills");
  console.log("🗑️  bills table dropped");
};
