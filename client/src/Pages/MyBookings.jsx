import { useEffect, useState } from "react";

import axios from "axios";

function MyBookings() {

  const [bookings, setBookings] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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

      const filteredBookings =
        res.data.filter(

          (booking) =>
            booking.customer?._id ===
            user._id
        );

      setBookings(filteredBookings);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchBookings();

  }, []);

  return (

    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400 mb-10">

        My Bookings

      </h1>

      {bookings.length === 0 ? (

        <div className="text-gray-400 text-xl">

          No bookings found

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {bookings.map((booking) => (

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
                <span
                  className={`ml-2 font-semibold ${
                    booking.status ===
                    "pending"
                      ? "text-yellow-400"
                      : booking.status ===
                        "accepted"
                      ? "text-green-400"
                      : "text-cyan-400"
                  }`}
                >
                  {booking.status}
                </span>

              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default MyBookings;