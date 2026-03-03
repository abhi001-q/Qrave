import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PublicLayout() {
  const { user } = useAuth();

  const getDashboardLink = () => {
    if (!user) return null;
    if (user.role === "admin") return "/admin";
    if (user.role === "manager") return "/manager";
    return "/dashboard";
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#0f0f0f]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            <span className="text-orange-500">Q</span>rave
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/menu"
              className="text-sm text-white/70 hover:text-white transition"
            >
              Menu
            </Link>
            {user ? (
              <Link
                to={getDashboardLink()}
                className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm text-white/70 hover:text-white transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Page content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
