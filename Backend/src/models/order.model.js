const pool = require("../config/db");

const Order = {
  async create({ user_id, table_id, total_amount, items, orderType, paymentMethod, delivery_location, delivery_zip }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [orderResult] = await connection.query(
        "INSERT INTO orders (user_id, table_id, total_amount, status, orderType, paymentMethod, delivery_location, delivery_zip) VALUES (?, ?, ?, 'PENDING', ?, ?, ?, ?)",
        [
          user_id || null, 
          table_id || null, 
          total_amount, 
          orderType || 'Dine-in', 
          paymentMethod || 'CASH', 
          delivery_location || null, 
          delivery_zip || null
        ]
      );
      const orderId = orderResult.insertId;

      const orderItemsData = items.map(item => [orderId, item.product_id || item.productId, item.quantity, item.price]);
      await connection.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
        [orderItemsData]
      );

      if (table_id) {
        await connection.query("UPDATE restaurant_tables SET status = 'Occupied' WHERE id = ?", [table_id]);
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
       LEFT JOIN restaurant_tables t ON o.table_id = t.id 
       WHERE o.user_id = ? 
       ORDER BY o.created_at DESC`,
      [userId]
    );
    return rows;
  },

  async findAllAsManager() {
    const [rows] = await pool.query(
      `SELECT o.*, t.table_number, u.name as customer_name, u.phone as customer_phone,
       (SELECT SUM(quantity) FROM order_items WHERE order_id = o.id) as items_count
       FROM orders o 
       LEFT JOIN restaurant_tables t ON o.table_id = t.id 
       LEFT JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );
    return rows;
  }
};

module.exports = Order;
