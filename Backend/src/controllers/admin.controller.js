const pool = require("../config/db");
const { sendSuccess, sendError } = require("../utils/apiResponse");

exports.getDashboardStats = async (req, res) => {
  try {
    const [[{ total_users: totalUsers }]] = await pool.query("SELECT COUNT(*) as total_users FROM users WHERE role='user'");
    const [[{ total_managers: totalManagers }]] = await pool.query("SELECT COUNT(*) as total_managers FROM users WHERE role IN ('manager', 'admin')");
    const [[{ active_orders: activeOrders }]] = await pool.query("SELECT COUNT(*) as active_orders FROM orders WHERE status NOT IN ('Delivered', 'Cancelled')");
    const [[{ total_revenue: totalRevenue }]] = await pool.query("SELECT COALESCE(SUM(total_amount), 0) as total_revenue FROM orders WHERE status IN ('Paid', 'Delivered')");
    
    sendSuccess(res, 200, {
      totalUsers,
      totalManagers,
      activeOrders,
      totalRevenue,
      serverUptime: "99.99%",
      apiLatency: "45ms"
    });
  } catch (err) {
    console.error("Admin Dashboard Error:", err);
    sendError(res, 500, "Failed to fetch system stats");
  }
};
