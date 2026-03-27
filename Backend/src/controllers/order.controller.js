const Order = require("../models/order.model");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const fs = require('fs');
const path = require('path');
const debugLog = path.join(__dirname, '../../debug.log');

exports.createOrder = async (req, res) => {
  try {
    let { tableId, totalAmount, items, orderType, paymentMethod, delivery_location, delivery_zip } = req.body;
    
    // Normalize orderType for ENUM('Dine-in', 'Delivery')
    if (orderType === "Dine In") orderType = "Dine-in";
    if (!orderType) orderType = "Dine-in";
    if (!items || !Array.isArray(items) || items.length === 0) {
      return sendError(res, 400, "Order must contain at least one item");
    }

    if (totalAmount == null || isNaN(Number(totalAmount))) {
      return sendError(res, 400, `Invalid or missing totalAmount. Received: ${totalAmount}. Keys: ${Object.keys(req.body).join(', ')}`);
    }
    
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
    const formatted = orders.map(o => {
      let itemsCount = 0;
      try {
        const itemsList = typeof o.items === 'string' ? JSON.parse(o.items) : (o.items || []);
        itemsCount = itemsList.reduce((sum, item) => sum + (item.quantity || 1), 0);
      } catch (e) {
        console.error("Error parsing items for count:", e);
      }

      const dateObj = new Date(o.created_at);
      const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dateStr = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });

      return {
        id: o.id.toString(),
        table: o.table_number || o.table_id,
        status: (o.status || 'PENDING').toUpperCase(),
        items: itemsCount,
        total: parseFloat(o.total_amount),
        time: `${dateStr} • ${timeStr}`,
        type: o.order_type || o.orderType || 'Dine-in',
        customer: (o.order_type || o.orderType) === 'Delivery' 
          ? { name: o.customer_name || 'Guest', phone: '', address: o.delivery_location || 'N/A' } 
          : null
      };
    });
    sendSuccess(res, 200, formatted);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userDisplay = req.user ? JSON.stringify(req.user) : 'Guest User';
    const logMsg = `[${new Date().toISOString()}] UPDATE STATUS: id=${id}, status=${status}, user=${userDisplay}\n`;
    fs.appendFileSync(debugLog, logMsg);
    
    if (!status) return sendError(res, 400, 'Status is required');
    await Order.updateStatus(id, status.toUpperCase());
    sendSuccess(res, 200, null, "Order status updated");
  } catch (err) {
    const errMsg = `[${new Date().toISOString()}] ERROR: ${err.stack}\n`;
    fs.appendFileSync(debugLog, errMsg);
    sendError(res, 500, err.message);
  }
};

exports.updateTransactionId = async (req, res) => {
  try {
    const { id } = req.params;
    const { transaction_uuid } = req.body;
    
    if (!transaction_uuid) return sendError(res, 400, 'transaction_uuid is required');
    
    await Order.updateTransactionId(id, transaction_uuid);
    sendSuccess(res, 200, null, "Order transaction UUID updated");
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return sendError(res, 404, "Order not found");
    
    // Format items if they are stored as JSON string
    if (order.items && typeof order.items === 'string') {
      try {
        order.items = JSON.parse(order.items);
      } catch (e) {
        console.error("Error parsing order items:", e);
      }
    }
    
    sendSuccess(res, 200, order);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};
