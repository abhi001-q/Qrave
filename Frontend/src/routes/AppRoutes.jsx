import { Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout  from '../layouts/PublicLayout';
import UserLayout    from '../layouts/UserLayout';
import ManagerLayout from '../layouts/ManagerLayout';
import AdminLayout   from '../layouts/AdminLayout';

// Guards
import ProtectedRoute from './ProtectedRoute';
import RoleRoute      from './RoleRoute';

// Public pages
import Home      from '../pages/public/Home';
import Menu      from '../pages/public/Menu';
import GuestCart from '../pages/public/GuestCart';

// Auth pages
import Login          from '../pages/auth/Login';
import Register       from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';

// User pages
import UserDashboard from '../pages/user/UserDashboard';
import OrderHistory  from '../pages/user/OrderHistory';
import OrderDetail   from '../pages/user/OrderDetail';
import TableBooking  from '../pages/user/TableBooking';
import Profile       from '../pages/user/Profile';
import Checkout      from '../pages/user/Checkout';

// Manager pages
import ManagerDashboard from '../pages/manager/ManagerDashboard';
import Products         from '../pages/manager/Products';
import Categories       from '../pages/manager/Categories';
import Tables           from '../pages/manager/Tables';
import Orders           from '../pages/manager/Orders';
import BillSection      from '../pages/manager/BillSection';
import ManagerProfile   from '../pages/manager/ManagerProfile';

// Admin pages
import AdminDashboard  from '../pages/admin/AdminDashboard';
import UserManagement  from '../pages/admin/UserManagement';
import ManagerApproval from '../pages/admin/ManagerApproval';
import SystemStatus    from '../pages/admin/SystemStatus';

export default function AppRoutes() {
  return (
    <Routes>
      {/* ── Public (guest + logged-in users) ── */}
      <Route element={<PublicLayout />}>
        <Route path="/"          element={<Home />} />
        <Route path="/menu"      element={<Menu />} />
        <Route path="/cart"      element={<GuestCart />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/forgot"    element={<ForgotPassword />} />
      </Route>

      {/* ── Logged-in User ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute roles={['user']} />}>
          <Route element={<UserLayout />}>
            <Route path="/dashboard"       element={<UserDashboard />} />
            <Route path="/orders"          element={<OrderHistory />} />
            <Route path="/orders/:id"      element={<OrderDetail />} />
            <Route path="/book-table"      element={<TableBooking />} />
            <Route path="/profile"         element={<Profile />} />
            <Route path="/checkout"        element={<Checkout />} />
          </Route>
        </Route>
      </Route>

      {/* ── Manager ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute roles={['manager']} />}>
          <Route element={<ManagerLayout />}>
            <Route path="/manager"               element={<ManagerDashboard />} />
            <Route path="/manager/products"      element={<Products />} />
            <Route path="/manager/categories"    element={<Categories />} />
            <Route path="/manager/tables"        element={<Tables />} />
            <Route path="/manager/orders"        element={<Orders />} />
            <Route path="/manager/bills"         element={<BillSection />} />
            <Route path="/manager/profile"       element={<ManagerProfile />} />
          </Route>
        </Route>
      </Route>

      {/* ── Admin ── */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute roles={['admin']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin"                element={<AdminDashboard />} />
            <Route path="/admin/users"          element={<UserManagement />} />
            <Route path="/admin/managers"       element={<ManagerApproval />} />
            <Route path="/admin/system"         element={<SystemStatus />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
