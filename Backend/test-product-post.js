const mysql = require('mysql2/promise');
require('dotenv').config();
const Product = require('./src/models/product.model');

async function testPost() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'qrave',
  });

  try {
    const productId = await Product.create({
      title: "Test Dish",
      description: "Testing API",
      price: 15.99,
      category_id: 1, // assuming category ID 1 exists
      image: null,
      status: "Active"
    });
    console.log("SUCCESS! Created Product ID:", productId);
  } catch (err) {
    console.error("CREATE PRODUCT FAILED:", err);
  } finally {
    pool.end();
  }
}

testPost();
