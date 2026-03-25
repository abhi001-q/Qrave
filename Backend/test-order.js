const mysql = require('mysql2/promise');
const Order = require('./src/models/order.model');
require('dotenv').config();

async function testOrder() {
  try {
    const orderId = await Order.create({
      user_id: 1, // Assume an authenticated user
      table_id: 1,
      total_amount: 500,
      items: [
        { productId: 1, quantity: 2, price: 250 }
      ],
      orderType: 'Dine-in',
      paymentMethod: 'CASH',
    });
    console.log("SUCCESS! Order ID:", orderId);
  } catch (err) {
    console.error("Order Creation Failed:", err);
  }
}

testOrder();
