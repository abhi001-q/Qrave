const pool = require("../config/db");

const Booking = {
  async create(data) {
    // Construct DATETIME from date and time
    const bookingDateTime = `${data.date} ${data.time}:00`;
    const [result] = await pool.query(
      `INSERT INTO bookings (user_id, table_id, booking_time, guests, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.user_id,
        null, // table_id assigned later
        bookingDateTime,
        data.guests,
        "Confirmed" // Auto confirmed for now
      ]
    );
    return result.insertId;
  },

  async findAll() {
    const [rows] = await pool.query(`
      SELECT b.*, u.name as user_name, u.email as user_email
      FROM bookings b
      LEFT JOIN users u ON b.user_id = u.id
      ORDER BY b.booking_time DESC
    `);
    return rows;
  },

  async findByUser(userId) {
    const [rows] = await pool.query(`
      SELECT * FROM bookings WHERE user_id = ? ORDER BY booking_time DESC
    `, [userId]);
    return rows;
  },

  async updateStatus(id, status) {
    const [result] = await pool.query(
      "UPDATE bookings SET status = ? WHERE id = ?",
      [status, id]
    );
    return result.affectedRows;
  }
};

module.exports = Booking;
