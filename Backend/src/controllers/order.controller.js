const Order = require("../models/order.model");
const { sendSuccess, sendError } = require("../utils/apiResponse");

exports.createOrder = async (req, res) => {
  try {
    const { table_id, total_amount, items, orderType, paymentMethod, delivery_location, delivery_zip } = req.body;
    const orderId = await Order.create({
      user_id: req.user?.id || null,
      table_id,
      total_amount,
      items,
      orderType,
      paymentMethod,
      delivery_location,
      delivery_zip
    });
    sendSuccess(res, 201, { orderId }, "Order placed successfully");
  } catch (err) {
    console.error("Checkout Controller Error:", err);
    sendError(res, 500, err.message); // This will show up in Axios response
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
