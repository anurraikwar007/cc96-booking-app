import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/auth/verify-otp", formData);

      alert("OTP Verified");
      navigate("/login");
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 w-96">

        <input name="email" placeholder="Email"
          className="w-full p-2 mb-3 bg-black border"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input name="otp" placeholder="OTP"
          className="w-full p-2 mb-3 bg-black border"
          onChange={(e) =>
            setFormData({ ...formData, otp: e.target.value })
          }
        />

        <button className="w-full bg-cyan-500 py-2">
          Verify
        </button>

      </form>
    </div>
  );
}

export default VerifyOtp;