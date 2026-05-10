const mongoose = require("mongoose");

const bookingSchema =
  new mongoose.Schema(
    {
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      serviceName: String,

      price: Number,

      status: {
        type: String,
        default: "pending",
      },
    },
    { timestamps: true }
  );

module.exports =
  mongoose.model("Booking", bookingSchema);