const Order = require("../models/order.model");
const { sendSuccess, sendError } = require("../utils/apiResponse");

exports.createOrder = async (req, res) => {
  try {
    const { table_id, total_amount, items } = req.body;
    const orderId = await Order.create({
      user_id: req.user?.id || null,
      table_id,
      total_amount,
      items
    });
    sendSuccess(res, 201, { orderId }, "Order placed successfully");
  } catch (err) {
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
