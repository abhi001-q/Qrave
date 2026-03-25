const pool = require("../config/db");
const { sendSuccess, sendError } = require("../utils/apiResponse");

exports.getAnalytics = async (req, res) => {
  try {
    // 1. Basic KPIs
    const [[{ gross_revenue: grossRevenue }]] = await pool.query(
      "SELECT COALESCE(SUM(total_amount), 0) as gross_revenue FROM orders WHERE status = 'delivered'"
    );
    const [[{ total_orders: totalOrders }]] = await pool.query("SELECT COUNT(*) as total_orders FROM orders");
    const [[{ new_customers: newCustomers }]] = await pool.query(
      "SELECT COUNT(*) as new_customers FROM users WHERE role = 'user' AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)"
    );
    
    const avgOrderValue = totalOrders > 0 ? (grossRevenue / totalOrders) : 0;

    // 2. Sales Data (Last 7 Days)
    const [salesRaw] = await pool.query(`
      SELECT DATE(created_at) as date, SUM(total_amount) as total 
      FROM orders 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) 
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `);

    // 3. Top Performers (Parsing JSON items column)
    const [ordersWithItems] = await pool.query("SELECT items FROM orders WHERE status = 'delivered'");
    const itemMap = {};

    ordersWithItems.forEach(row => {
      try {
        const items = Array.isArray(row.items) ? row.items : JSON.parse(row.items || "[]");
        items.forEach(item => {
          const name = item.name || item.title || `Product #${item.productId}`;
          if (!itemMap[name]) {
            itemMap[name] = { name, revenue: 0, orders: 0, color: 'bg-purple-600' };
          }
          itemMap[name].revenue += (item.price * item.quantity);
          itemMap[name].orders += item.quantity;
        });
      } catch (e) {
        console.error("Error parsing order items for analytics:", e);
      }
    });

    const topPerformers = Object.values(itemMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 4);

    sendSuccess(res, 200, {
      grossRevenue,
      avgOrderValue,
      totalOrders,
      newCustomers,
      salesData: salesRaw,
      topPerformers
    });
  } catch (err) {
    console.error("Analytics Error:", err);
    sendError(res, 500, "Failed to fetch analytics");
  }
};
