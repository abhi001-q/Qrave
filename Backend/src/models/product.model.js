const pool = require("../config/db");

const Product = {
  async findAll() {
    const [rows] = await pool.query(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_available = 1
    `);
    return rows;
  },

  async findByCategory(categoryId) {
    const [rows] = await pool.query("SELECT * FROM products WHERE category_id = ? AND is_available = 1", [categoryId]);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0] || null;
  }
};

module.exports = Product;
