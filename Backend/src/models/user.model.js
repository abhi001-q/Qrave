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

  async setOTP(email, otp, expires) {
    await pool.query(
      "UPDATE users SET otp_code = ?, otp_expires = ? WHERE email = ?",
      [otp, expires, email],
    );
  },

  async verifyOTP(email, otp) {
    const [rows] = await pool.query(
      "SELECT otp_code, otp_expires FROM users WHERE email = ?",
      [email],
    );
    if (!rows[0]) return false;
    const { otp_code, otp_expires } = rows[0];
    if (otp_code !== otp) return false;
    if (new Date() > new Date(otp_expires)) return false;
    return true;
  },

  async clearOTP(email) {
    await pool.query(
      "UPDATE users SET otp_code = NULL, otp_expires = NULL WHERE email = ?",
      [email],
    );
  },

  async updatePassword(email, hashedPassword) {
    await pool.query("UPDATE users SET password = ? WHERE email = ?", [
      hashedPassword,
      email,
    ]);
  },
};

module.exports = User;
