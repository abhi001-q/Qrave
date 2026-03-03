import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function UserLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-white/10 bg-[#111] p-4 flex flex-col gap-2 shrink-0">
        <Link to="/" className="text-2xl font-bold mb-6">
          <span className="text-orange-500">Q</span>rave
        </Link>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/orders">My Orders</NavLink>
        <NavLink to="/book-table">Book Table</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/menu">Menu</NavLink>

        <div className="mt-auto pt-4 border-t border-white/10">
          <p className="text-xs text-white/40 mb-2">
            Signed in as <span className="text-orange-400">{user?.name}</span>
          </p>
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-300 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-sm text-white/60 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition"
    >
      {children}
    </Link>
  );
}
