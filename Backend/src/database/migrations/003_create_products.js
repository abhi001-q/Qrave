const pool = require("../../config/db");

exports.up = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id          INT           AUTO_INCREMENT PRIMARY KEY,
      title       VARCHAR(150)  NOT NULL,
      description TEXT          DEFAULT NULL,
      price       DECIMAL(10,2) NOT NULL,
      category_id INT           NULL,
      image       LONGTEXT      DEFAULT NULL,
      is_available BOOLEAN      NOT NULL DEFAULT 1,
      status      VARCHAR(50)   NOT NULL DEFAULT 'Active',
      created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
      updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log("✅ products table created");
};

exports.down = async () => {
  await pool.query("DROP TABLE IF EXISTS products");
  console.log("🗑️  products table dropped");
};
