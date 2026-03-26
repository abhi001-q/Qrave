const pool = require("../config/db");

const Order = {
  async create({ user_id, table_id, total_amount, items, orderType, paymentMethod, delivery_location, delivery_zip }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [orderResult] = await connection.query(
        "INSERT INTO orders (user_id, table_id, total_amount, items, status, order_type, payment_method, delivery_location, delivery_zip) VALUES (?, ?, ?, ?, 'PENDING', ?, ?, ?, ?)",
        [
          user_id || null, 
          table_id || null, 
          total_amount, 
          JSON.stringify(items),
          orderType || 'Dine-in', 
          paymentMethod || 'CASH', 
          delivery_location || null, 
          delivery_zip || null
        ]
      );
      const orderId = orderResult.insertId;

      if (table_id) {
        await connection.query("UPDATE tables SET status = 'Occupied' WHERE id = ?", [table_id]);
      }

      await connection.commit();
      return orderId;
    } catch (err) {
      console.error("ORDER MODEL ERROR:", err);
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  },

  async updateStatus(id, status) {
    const [result] = await pool.query(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, id]
    );
    return result.affectedRows > 0;
  },

  async updateTransactionId(id, transactionUuid) {
    const [result] = await pool.query(
      "UPDATE orders SET transaction_uuid = ? WHERE id = ?",
      [transactionUuid, id]
    );
    return result.affectedRows > 0;
  },

  async findByUserId(userId) {
    const [rows] = await pool.query(
      `SELECT o.*, t.table_number 
       FROM orders o 
       LEFT JOIN tables t ON o.table_id = t.id 
       WHERE o.user_id = ? 
       ORDER BY o.created_at DESC`,
      [userId]
    );
    return rows;
  },

  async findAllAsManager() {
    const [rows] = await pool.query(
      `SELECT o.*, t.table_number, u.name as customer_name
       FROM orders o 
       LEFT JOIN tables t ON o.table_id = t.id 
       LEFT JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query(
      `SELECT o.*, t.table_number, u.name as customer_name, u.phone as customer_phone
       FROM orders o 
       LEFT JOIN tables t ON o.table_id = t.id 
       LEFT JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`,
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }
};

module.exports = Order;
