import { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

function VendorDashboard() {

  const [bookings, setBookings] =
    useState([]);

  const vendor = JSON.parse(
    localStorage.getItem("user")
  );

  // logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  // fetch bookings
  const fetchBookings = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(

        "http://localhost:5000/api/bookings",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchBookings();

  }, []);

  // accept booking
  const handleAccept = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:5000/api/bookings/accept/${id}`,

        {
          vendorId: vendor._id,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Booking Accepted");

      fetchBookings();

    } catch (error) {

      console.log(error);

      toast.error("Accept Failed");
    }
  };

  // delivered
  const handleDelivered = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:5000/api/bookings/deliver/${id}`,

        {},

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Service Delivered");

      fetchBookings();

    } catch (error) {

      console.log(error);

      toast.error("Delivery Failed");
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      {/* top */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">

        <div>

          <h1 className="text-4xl font-bold text-cyan-400">

            Vendor Dashboard

          </h1>

          <p className="text-gray-400 mt-2">

            Welcome,
            {" "}
            {vendor?.name}

          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>


      {/* bookings */}
      <div className="grid md:grid-cols-2 gap-6">

        {bookings.length === 0 ? (

          <div className="text-gray-400 text-xl">

            No Bookings Found

          </div>

        ) : (

          bookings
            .filter(
              (booking) =>
                booking.status !== "delivered"
            )
            .map((booking) => (

              <div
                key={booking._id}
                className="bg-slate-900 p-6 rounded-xl shadow-lg"
              >

                <h2 className="text-2xl font-bold">

                  {booking.serviceName}

                </h2>

                <p className="mt-2 text-gray-400">

                  ₹ {booking.price}

                </p>

                <p className="mt-2">

                  Status:
                  <span className="text-cyan-400 ml-2">

                    {booking.status}

                  </span>

                </p>

                <p className="mt-2 text-sm text-gray-500">

                  Customer:
                  {" "}
                  {booking.customer?.name}

                </p>


                {/* accept */}
                {booking.status === "pending" && (

                  <button
                    onClick={() =>
                      handleAccept(
                        booking._id
                      )
                    }
                    className="mt-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                  >
                    Accept Booking
                  </button>
                )}


                {/* delivered */}
                {booking.status === "accepted" && (

                  <button
                    onClick={() =>
                      handleDelivered(
                        booking._id
                      )
                    }
                    className="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                  >
                    Mark Delivered
                  </button>
                )}

              </div>
            ))
        )}

      </div>

    </div>
  );
}

export default VendorDashboard;