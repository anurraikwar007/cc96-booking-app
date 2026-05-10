import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token) {
      navigate(
        user?.role === "vendor"
          ? "/vendor-dashboard"
          : "/customer-dashboard",
        { replace: true }
      );
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ FIXED (NO localhost)
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate(
        res.data.user.role === "vendor"
          ? "/vendor-dashboard"
          : "/customer-dashboard",
        { replace: true }
      );
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-8 rounded-xl w-96 shadow-lg"
      >
        <h2 className="text-2xl mb-6 text-cyan-400 font-bold">
          Login
        </h2>

        <input
          className="w-full p-2 mb-4 bg-black border border-gray-600 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 bg-black border border-gray-600 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-cyan-500 py-2 rounded hover:bg-cyan-600">
          Login
        </button>

        <div className="mt-4 text-center text-sm">
          <p className="text-gray-400">
            Don’t have account?{" "}
            <Link to="/signup" className="text-cyan-400">
              Signup
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

export default Login;