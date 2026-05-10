import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import CustomerDashboard from "./pages/CustomerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import MyBookings from "./pages/MyBookings";
import ProtectedRoute from "./routes/ProtectedRoute";

import PageTransition from "./components/PageTransition";

function App() {

  const token =
    localStorage.getItem("token");

  const user =
    JSON.parse(localStorage.getItem("user"));

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />

        {/* LOGIN (AUTO REDIRECT IF LOGGED IN) */}
        <Route
          path="/login"
          element={
            token ? (
              <Navigate
                to={
                  user?.role === "vendor"
                    ? "/vendor-dashboard"
                    : "/customer-dashboard"
                }
                replace
              />
            ) : (
              <PageTransition>
                <Login />
              </PageTransition>
            )
          }
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={
            token ? (
              <Navigate
                to="/customer-dashboard"
                replace
              />
            ) : (
              <PageTransition>
                <Signup />
              </PageTransition>
            )
          }
        />

        {/* OTP */}
        <Route
          path="/verify-otp"
          element={
            <PageTransition>
              <VerifyOtp />
            </PageTransition>
          }
        />

        {/* CUSTOMER DASHBOARD */}
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute>
              <PageTransition>
                <CustomerDashboard />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        {/* VENDOR DASHBOARD */}
        <Route
          path="/vendor-dashboard"
          element={
            <ProtectedRoute>
              <PageTransition>
                <VendorDashboard />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        {/* BOOKINGS */}
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <PageTransition>
                <MyBookings />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
              <h1 className="text-3xl">
                404 - Page Not Found
              </h1>
            </div>
          }
        />

      </Routes>
           <App />
    </BrowserRouter>
  );
}

export default App;