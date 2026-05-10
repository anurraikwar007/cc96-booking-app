const Booking = require("../models/Booking");

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const {
      serviceName,
      price,
    } = req.body;

    const booking =
      await Booking.create({
        customer: req.user.id,
        serviceName,
        price,
        status: "pending",
      });

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "Booking Failed",
    });
  }
};

// GET BOOKINGS
exports.getBookings = async (req, res) => {
  try {
    const bookings =
      await Booking.find()
        .populate("customer");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
    });
  }
};

// ACCEPT BOOKING
exports.acceptBooking = async (
  req,
  res
) => {
  try {
    await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: "accepted",
      }
    );

    res.json({
      message: "Booking Accepted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Accept Failed",
    });
  }
};

// DELIVER BOOKING
exports.deliverBooking = async (
  req,
  res
) => {
  try {
    await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: "delivered",
      }
    );

    res.json({
      message: "Delivered",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delivery Failed",
    });
  }
};