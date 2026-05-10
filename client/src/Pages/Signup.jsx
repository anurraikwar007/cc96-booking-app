import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";   // ✅ FIXED

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/customer-dashboard", { replace: true });
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/api/auth/signup", {
        name,
        email,
        password,
        role,
      });

      alert(res.data.message);

      navigate("/verify-otp", {
        state: { email },
        replace: true,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSignup}
        className="bg-slate-900 p-8 rounded-xl w-96 shadow-lg"
      >
        <h2 className="text-2xl mb-6 text-cyan-400 font-bold">
          Signup
        </h2>

        <input
          className="w-full p-2 mb-3 bg-black border border-gray-600 rounded"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 bg-black border border-gray-600 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 bg-black border border-gray-600 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full p-2 mb-4 bg-black border border-gray-600 rounded"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>

        <button className="w-full bg-cyan-500 py-2 rounded hover:bg-cyan-600">
          Signup
        </button>

        <div className="mt-4 text-center text-sm">
          <p className="text-gray-400">
            Already have account?{" "}
            <Link to="/login" className="text-cyan-400">
              Login
            </Link>
          </p>

          <Link to="/" className="text-gray-500 block mt-2">
            ← Back to Home
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;