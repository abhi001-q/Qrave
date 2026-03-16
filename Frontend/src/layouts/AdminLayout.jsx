import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    /* ── Fixed desktop layout: sidebar + content, no responsive prefixes ── */
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }} className="bg-[#0f0f0f] text-white">
      {/* Sidebar — fixed width, never shrinks */}
      <aside style={{ width: "224px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "8px", padding: "16px", borderRight: "1px solid rgba(255,255,255,0.1)" }} className="bg-[#111]">
        <Link to="/" style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "24px", display: "block" }}>
          <span className="text-orange-500">Q</span>rave
          <span style={{ fontSize: "10px", marginLeft: "4px", color: "#f87171", backgroundColor: "rgba(239,68,68,0.1)", padding: "2px 6px", borderRadius: "4px" }}>
            ADMIN
          </span>
        </Link>
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/managers">Managers</NavLink>
        <NavLink to="/admin/system">System</NavLink>

        <div style={{ marginTop: "auto", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>
            Admin: <span className="text-red-400">{user?.name}</span>
          </p>
          <button
            onClick={handleLogout}
            style={{ fontSize: "14px", color: "#f87171", cursor: "pointer" }}
            className="hover:text-red-300 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Content — fills remaining width, scrollable */}
      <main style={{ flex: 1, minWidth: 0, padding: "24px", overflowY: "auto" }}>
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{ fontSize: "14px", padding: "8px 12px", borderRadius: "8px", display: "block" }}
      className="text-white/60 hover:text-white hover:bg-white/5 transition"
    >
      {children}
    </Link>
  );
}
