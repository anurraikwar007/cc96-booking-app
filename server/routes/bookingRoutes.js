const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const bookingController =
  require("../controllers/bookingController");

// Create booking
router.post(
  "/create",
  authMiddleware,
  bookingController.createBooking
);

// Get bookings
router.get(
  "/",
  authMiddleware,
  bookingController.getBookings
);

// Accept booking
router.put(
  "/accept/:id",
  authMiddleware,
  bookingController.acceptBooking
);

// Deliver booking
router.put(
  "/deliver/:id",
  authMiddleware,
  bookingController.deliverBooking
);

module.exports = router;