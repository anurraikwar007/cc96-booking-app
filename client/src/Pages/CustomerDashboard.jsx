import axios from "axios";

import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { useEffect } from "react";

import io from "socket.io-client";

const socket = io("http://localhost:5000");

function CustomerDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token =
    localStorage.getItem("token");

  // logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  // SOCKET LISTENER
  useEffect(() => {

    socket.on("bookingUpdated", (data) => {

      toast.info(
        `Booking ${data.status}`
      );
    });

    return () => socket.disconnect();

  }, []);

  const services = [

    { name: "AC Repair", price: 499 },

    { name: "Home Cleaning", price: 999 },

    { name: "Electrician", price: 699 },

    { name: "Plumbing", price: 799 },
  ];

  const handleBooking = async (service) => {

    try {

      const res = await axios.post(

        "http://localhost:5000/api/bookings/create",

        {
          serviceName: service.name,
          price: service.price,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Service Booked");

      // 🔥 REAL TIME UPDATE SEND
      socket.emit("bookingUpdate", {
        status: "new booking",
      });

    } catch (error) {

      toast.error("Booking Failed");
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      {/* HEADER */}
      <div className="flex justify-between mb-10">

        <h1 className="text-3xl text-cyan-400 font-bold">
          Welcome {user?.name}
        </h1>

        <div className="flex gap-3">

          <Link
            to="/my-bookings"
            className="bg-cyan-500 px-4 py-2 rounded"
          >
            My Bookings
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>

        </div>

      </div>

      {/* SERVICES */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {services.map((s, i) => (

          <div
            key={i}
            className="bg-slate-900 p-6 rounded-xl hover:scale-105 transition"
          >

            <h2 className="text-xl font-bold">
              {s.name}
            </h2>

            <p>₹ {s.price}</p>

            <button
              onClick={() =>
                handleBooking(s)
              }
              className="mt-4 bg-cyan-500 px-3 py-2 rounded"
            >
              Book Now
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default CustomerDashboard;