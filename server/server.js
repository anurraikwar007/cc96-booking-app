const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const http = require("http");

const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");

const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// socket connection
io.on("connection", (socket) => {

  console.log("User connected");

  socket.on("bookingUpdate", (data) => {

    io.emit("bookingUpdated", data);
  });
});

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// test
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    server.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on port ${
          process.env.PORT || 5000
        }`
      );
    });
  })
  .catch((err) => {
    console.log(err.message);
  });