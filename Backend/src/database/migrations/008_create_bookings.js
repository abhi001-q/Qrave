const pool = require("../../config/db");

exports.up = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id          INT           AUTO_INCREMENT PRIMARY KEY,
      user_id     INT           NULL,
      table_id    INT           NULL,
      booking_time DATETIME     NOT NULL,
      guests      INT           NOT NULL,
      status      VARCHAR(50)   NOT NULL DEFAULT 'CONFIRMED',
      created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (table_id) REFERENCES restaurant_tables(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log("✅ bookings table created");
};

exports.down = async () => {
  await pool.query("DROP TABLE IF EXISTS bookings");
  console.log("🗑️  bookings table dropped");
};
