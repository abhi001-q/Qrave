const pool = require("../config/db");

const Product = {
  async findAll() {
    const [rows] = await pool.query(`
      SELECT p.*, p.name AS title, IF(p.is_available = 1, 'Active', 'Inactive') AS status, c.name as category 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.id DESC
    `);
    return rows;
  },

  async findByCategory(categoryId) {
    const [rows] = await pool.query(`
      SELECT p.*, p.name AS title, IF(p.is_available = 1, 'Active', 'Inactive') AS status, c.name as category 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.category_id = ?
    `, [categoryId]);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query(`
      SELECT p.*, p.name AS title, IF(p.is_available = 1, 'Active', 'Inactive') AS status, c.name as category 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = ?
    `, [id]);
    return rows[0] || null;
  },

  async create(data) {
    const [result] = await pool.query(`
      INSERT INTO products (name, description, price, category_id, image, is_available)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      data.title || data.name, 
      data.description || null, 
      data.price, 
      data.category_id || null, 
      data.image || null, 
      data.status === 'Active' ? 1 : 0
    ]);
    return result.insertId;
  },

  async update(id, data) {
    const [result] = await pool.query(`
      UPDATE products 
      SET name = ?, description = ?, price = ?, category_id = ?, image = ?, is_available = ?
      WHERE id = ?
    `, [
      data.title || data.name, 
      data.description || null, 
      data.price, 
      data.category_id || null, 
      data.image || null, 
      data.status === 'Active' ? 1 : 0,
      id
    ]);
    return result.affectedRows;
  },

  async delete(id) {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
    return result.affectedRows;
  }
};

module.exports = Product;
