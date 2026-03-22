const pool = require("../config/db");

const Category = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM categories ORDER BY name ASC");
    return rows;
  },
  
  async findById(id) {
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async findByName(name) {
    const [rows] = await pool.query("SELECT * FROM categories WHERE name = ?", [name]);
    return rows[0] || null;
  },

  async create({ name, image, description }) {
    const [result] = await pool.query(
      "INSERT INTO categories (name, image, description) VALUES (?, ?, ?)",
      [name, image, description]
    );
    return result.insertId;
  }
};

module.exports = Category;
