import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="w-72 min-h-screen bg-gradient-to-b from-black to-slate-900 border-r border-white/10 p-6">

      {/* LOGO */}
      <h1 className="text-3xl font-bold text-cyan-400 tracking-wider">
        CC96
      </h1>

      <p className="text-gray-500 text-sm mt-1">
        SaaS Control Panel
      </p>

      {/* NAV */}
      <div className="mt-10 flex flex-col gap-5 text-gray-300">

        <Link className="hover:text-cyan-400 transition">
          Dashboard
        </Link>

        <Link className="hover:text-cyan-400 transition">
          Bookings
        </Link>

        <Link className="hover:text-cyan-400 transition">
          Analytics
        </Link>

        <Link className="hover:text-cyan-400 transition">
          Payments
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;