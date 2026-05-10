import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.clear();

    navigate("/login", { replace: true });
  };

  return (

    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">

      {/* LOGO */}
      <Link
        to="/"
        className="text-xl font-bold text-cyan-400"
      >
        CC96
      </Link>

      {/* HAMBURGER */}
      <div
        className="md:hidden cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        ☰
      </div>

      {/* MENU */}
      <div
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent flex flex-col md:flex-row gap-4 p-4 md:p-0 transition-all duration-300 ${
          open ? "block" : "hidden md:flex"
        }`}
      >

        <Link to="/">Home</Link>

        {!token ? (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/customer-dashboard">
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;