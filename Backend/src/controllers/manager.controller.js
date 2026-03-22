const pool = require("../config/db");
const { sendSuccess, sendError } = require("../utils/apiResponse");

exports.getAnalytics = async (req, res) => {
  try {
    const [[{ gross_revenue: grossRevenue }]] = await pool.query("SELECT COALESCE(SUM(total_amount), 0) as gross_revenue FROM orders WHERE status IN ('Paid', 'Delivered')");
    const [[{ total_orders: totalOrders }]] = await pool.query("SELECT COUNT(*) as total_orders FROM orders");
    const [[{ new_customers: newCustomers }]] = await pool.query("SELECT COUNT(*) as new_customers FROM users WHERE role = 'user' AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
    
    // Average Order Value
    const avgOrderValue = totalOrders > 0 ? (grossRevenue / totalOrders) : 0;

    // Last 7 days sales
    const [salesRaw] = await pool.query(`
      SELECT DATE(created_at) as date, SUM(total_amount) as total 
      FROM orders 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY) 
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `);

    // Top Performers (Mocked structure mostly, joining on order items if they existed, but we just simulate it based on products)
    const [topProducts] = await pool.query(`
      SELECT title as name, price as revenue, 100 as orders, 'bg-purple-600' as color
      FROM products
      LIMIT 4
    `);

    sendSuccess(res, 200, {
      grossRevenue,
      avgOrderValue,
      totalOrders,
      newCustomers,
      salesData: salesRaw,
      topPerformers: topProducts
    });
  } catch (err) {
    console.error("Analytics Error:", err);
    sendError(res, 500, "Failed to fetch analytics");
  }
};
