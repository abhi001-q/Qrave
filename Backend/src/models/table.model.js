const pool = require("../config/db");

const Table = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM tables ORDER BY table_number ASC");
    return rows;
  },

  async findAvailable() {
    const [rows] = await pool.query("SELECT * FROM tables WHERE status = 'available' ORDER BY table_number ASC");
    return rows;
  },

  async updateStatus(id, status) {
    await pool.query("UPDATE tables SET status = ? WHERE id = ?", [status, id]);
  }
};

module.exports = Table;
