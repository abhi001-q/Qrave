const pool = require("../../config/db");

exports.up = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id                INT           AUTO_INCREMENT PRIMARY KEY,
      user_id           INT           NULL,
      table_id          INT           NULL,
      total_amount      DECIMAL(10,2) NOT NULL,
      status            VARCHAR(50)   NOT NULL DEFAULT 'PENDING',
      orderType         VARCHAR(50)   NOT NULL DEFAULT 'Dine-in',
      paymentMethod     VARCHAR(50)   NOT NULL DEFAULT 'CASH',
      delivery_location VARCHAR(255)  NULL,
      delivery_zip      VARCHAR(20)   NULL,
      created_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
      updated_at        TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
      FOREIGN KEY (table_id) REFERENCES restaurant_tables(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log("✅ orders table created");
};

exports.down = async () => {
  await pool.query("DROP TABLE IF EXISTS orders");
  console.log("🗑️  orders table dropped");
};
