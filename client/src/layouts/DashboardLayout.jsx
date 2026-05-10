import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {

  return (

    <div className="flex min-h-screen bg-black text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1">

        <Navbar />

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;