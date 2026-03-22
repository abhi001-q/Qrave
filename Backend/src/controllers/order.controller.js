const Order = require("../models/order.model");
const { sendSuccess, sendError } = require("../utils/apiResponse");

exports.createOrder = async (req, res) => {
  try {
    const { tableId, totalAmount, items, orderType, paymentMethod, delivery_location, delivery_zip } = req.body;
    const orderId = await Order.create({
      user_id: req.user?.id || null,
      table_id: tableId || null,
      total_amount: totalAmount,
      items,
      orderType,
      paymentMethod,
      delivery_location,
      delivery_zip
    });
    sendSuccess(res, 201, { id: orderId }, "Order placed successfully");
  } catch (err) {
    console.error("Checkout Controller Error:", err);
    sendError(res, 500, err.message);
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findByUserId(req.user?.id || null);
    sendSuccess(res, 200, orders);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAllAsManager();
    const formatted = orders.map(o => ({
      id: o.id.toString(),
      table: o.table_number,
      status: o.status,
      items: o.items_count || 0,
      total: parseFloat(o.total_amount),
      time: new Date(o.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      type: o.orderType,
      customer: o.orderType === 'Delivery' ? { name: o.customer_name || 'Guest', phone: o.customer_phone || '', address: o.delivery_location || 'N/A' } : null
    }));
    sendSuccess(res, 200, formatted);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Order.updateStatus(id, status);
    sendSuccess(res, 200, null, "Order status updated");
  } catch (err) {
    sendError(res, 500, err.message);
  }
};
