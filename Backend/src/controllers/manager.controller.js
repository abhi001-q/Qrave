const pool = require("../config/db");
const { sendSuccess, sendError } = require("../utils/apiResponse");

exports.getAnalytics = async (req, res) => {
  try {
    // 1. Basic KPIs (All-time vs Today)
    const [[{ gross_revenue: grossRevenue }]] = await pool.query(
      "SELECT COALESCE(SUM(total_amount), 0) as gross_revenue FROM orders WHERE status = 'DELIVERED'"
    );
    
    // TODAY'S REVENUE
    const [[{ today_revenue: todayRevenue }]] = await pool.query(
      "SELECT COALESCE(SUM(total_amount), 0) as today_revenue FROM orders WHERE status = 'DELIVERED' AND DATE(created_at) = CURDATE()"
    );

    // ORDERS TODAY
    const [[{ orders_today: ordersToday }]] = await pool.query(
      "SELECT COUNT(*) as orders_today FROM orders WHERE DATE(created_at) = CURDATE()"
    );

    // PENDING ORDERS (Active)
    const [[{ pending_orders: pendingOrders }]] = await pool.query(
      "SELECT COUNT(*) as pending_orders FROM orders WHERE status NOT IN ('DELIVERED', 'CANCELLED')"
    );

    // TABLE OCCUPANCY
    const [[{ tables_occupied: tablesOccupied }]] = await pool.query(
      "SELECT COUNT(*) as tables_occupied FROM tables WHERE status = 'Occupied'"
    );
    const [[{ total_tables: totalTables }]] = await pool.query(
      "SELECT COUNT(*) as total_tables FROM tables"
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

    // 3. Top Performers
    const [ordersWithItems] = await pool.query("SELECT items FROM orders WHERE status = 'DELIVERED'");
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
      todayRevenue,
      ordersToday,
      pendingOrders,
      tablesOccupied,
      totalTables,
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
