const pool = require("../config/db");

const User = {
  async create({ name, email, password, phone, role }) {
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, phone || null, role || "user"],
    );
    return result.insertId;
  },

  async findByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await pool.query(
      "SELECT id, name, email, phone, role, is_active, created_at FROM users WHERE id = ?",
      [id],
    );
    return rows[0] || null;
  },

  async findAll() {
    const [rows] = await pool.query(
      "SELECT id, name, email, phone, role, is_active, created_at FROM users",
    );
    return rows;
  },
};

module.exports = User;
