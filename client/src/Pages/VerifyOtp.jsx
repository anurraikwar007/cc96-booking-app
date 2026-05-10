import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function VerifyOtp() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",

    otp: "",
  });

  // input change
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        "http://localhost:5000/api/auth/verify-otp",

        formData
      );

      console.log(res.data);

      toast.success("OTP Verified");

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error("Invalid OTP");
    }
  };

  return (

    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-6">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-xl w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">

          Verify OTP

        </h1>

        {/* email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"

          value={formData.email}

          onChange={handleChange}

          className="w-full p-3 rounded bg-slate-800 text-white mb-4 outline-none"
        />

        {/* otp */}
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"

          value={formData.otp}

          onChange={handleChange}

          className="w-full p-3 rounded bg-slate-800 text-white mb-4 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded font-semibold"
        >
          Verify OTP
        </button>

      </form>

    </div>
  );
}

export default VerifyOtp;