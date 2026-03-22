const router = require("express").Router();
const bookingController = require("../controllers/booking.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// User routes
router.post("/", authenticate, bookingController.createBooking);
router.get("/my-bookings", authenticate, bookingController.getUserBookings);

// Manager routes
router.get("/", authenticate, authorize("MANAGER", "ADMIN"), bookingController.getAllBookings);
router.patch("/:id/status", authenticate, authorize("MANAGER", "ADMIN"), bookingController.updateBookingStatus);

module.exports = router;
