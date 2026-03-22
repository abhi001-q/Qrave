const Booking = require("../models/booking.model");
const { sendSuccess, sendError } = require("../utils/apiResponse");

exports.createBooking = async (req, res) => {
  try {
    const { date, time, guests, specialRequests } = req.body;
    if (!date || !time || !guests) {
      return sendError(res, 400, "Date, time, and guests are required");
    }

    const bookingId = await Booking.create({
      user_id: req.user.id,
      date,
      time,
      guests,
      specialRequests
    });

    sendSuccess(res, 201, { id: bookingId }, "Table booked successfully");
  } catch (err) {
    console.error("Booking Error:", err);
    sendError(res, 500, "Failed to book table. " + err.message);
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    sendSuccess(res, 200, bookings);
  } catch (err) {
    console.error("Fetch Bookings Error:", err);
    sendError(res, 500, "Failed to fetch bookings");
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findByUser(req.user.id);
    sendSuccess(res, 200, bookings);
  } catch (err) {
    console.error("Fetch User Bookings Error:", err);
    sendError(res, 500, "Failed to fetch your bookings");
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await Booking.updateStatus(req.params.id, status);
    sendSuccess(res, 200, null, "Booking status updated");
  } catch (err) {
    console.error("Update Booking Error:", err);
    sendError(res, 500, "Failed to update booking");
  }
};
