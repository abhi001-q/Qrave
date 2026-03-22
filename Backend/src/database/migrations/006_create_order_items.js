const pool = require("../../config/db");

exports.up = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS order_items (
      id          INT           AUTO_INCREMENT PRIMARY KEY,
      order_id    INT           NOT NULL,
      product_id  INT           NOT NULL,
      quantity    INT           NOT NULL DEFAULT 1,
      price       DECIMAL(10,2) NOT NULL,
      created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log("✅ order_items table created");
};

exports.down = async () => {
  await pool.query("DROP TABLE IF EXISTS order_items");
  console.log("🗑️  order_items table dropped");
};
