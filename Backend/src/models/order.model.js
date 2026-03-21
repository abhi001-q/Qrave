const pool = require("../config/db");

const Order = {
  async create({ user_id, table_id, total_amount, items, orderType, paymentMethod, delivery_location, delivery_zip }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [orderResult] = await connection.query(
        "INSERT INTO orders (user_id, table_id, total_amount, status, order_type, payment_method, delivery_location, delivery_zip) VALUES (?, ?, ?, 'pending', ?, ?, ?, ?)",
        [
          user_id || null, 
          table_id, 
          total_amount, 
          orderType || 'Dine In', 
          paymentMethod || 'Cash', 
          delivery_location || null, 
          delivery_zip || null
        ]
      );
      const orderId = orderResult.insertId;

      const orderItemsData = items.map(item => [orderId, item.product_id, item.quantity, item.price]);
      await connection.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
        [orderItemsData]
      );

      if (table_id) {
        await connection.query("UPDATE tables SET status = 'occupied' WHERE id = ?", [table_id]);
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
  }
};

module.exports = Order;
