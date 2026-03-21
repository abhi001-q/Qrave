import { Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";
import ManagerLayout from "../layouts/ManagerLayout";
import AdminLayout from "../layouts/AdminLayout";

// Guards
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// Public pages
import Home from "../pages/public/Home";
import Menu from "../pages/public/Menu";
import CartPage from "../pages/public/CartPage";

// Auth pages
import Login from "../pages/auth/Login";
import AdminLogin from "../pages/auth/AdminLogin";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import OtpVerification from "../pages/auth/OtpVerification";

// User pages
import UserDashboard from "../pages/user/UserDashboard";
import OrderHistory from "../pages/user/OrderHistory";
import OrderDetail from "../pages/user/OrderDetail";
import TableBooking from "../pages/user/TableBooking";
import Profile from "../pages/user/Profile";
import Checkout from "../pages/user/Checkout";
import OrderTracking from "../pages/user/OrderTracking";
import PaymentSuccess from "../pages/user/PaymentSuccess";
import PaymentFailure from "../pages/user/PaymentFailure";

// Manager pages
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import Products from "../pages/manager/Products";
import Categories from "../pages/manager/Categories";
import Tables from "../pages/manager/Tables";
import Orders from "../pages/manager/Orders";
import BillSection from "../pages/manager/BillSection";
import Analytics from "../pages/manager/Analytics";
import Staff from "../pages/manager/Staff";

// Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import ManagerApprovals from "../pages/admin/ManagerApprovals";
import SystemHealth from "../pages/admin/SystemHealth";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Public (guest + logged-in users) ── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
      </Route>

      {/* ── Logged-in User ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute roles={["user"]} />}>
          <Route element={<UserLayout />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/orders/:id" element={<OrderDetail />} />
            <Route path="/orders/track/:id" element={<OrderTracking />} />
            <Route path="/book-table" element={<TableBooking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/failure" element={<PaymentFailure />} />
          </Route>
        </Route>
      </Route>

      {/* ── Manager & Staff ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute roles={["manager", "staff"]} />}>
          <Route element={<ManagerLayout />}>
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/manager/products" element={<Products />} />
            <Route path="/manager/categories" element={<Categories />} />
            <Route path="/manager/tables" element={<Tables />} />
            <Route path="/manager/orders" element={<Orders />} />
            <Route path="/manager/bills" element={<BillSection />} />
            <Route path="/manager/analytics" element={<Analytics />} />
            <Route path="/manager/staff" element={<Staff />} />
            <Route path="/manager/profile" element={<Profile />} />
          </Route>
        </Route>
      </Route>

      {/* ── Admin ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute roles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/managers" element={<ManagerApprovals />} />
            <Route path="/admin/system" element={<SystemHealth />} />
            <Route path="/admin/settings" element={<Profile />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
