import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ManagerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "Kitchen Control", path: "/manager", icon: "dashboard" },
    { name: "Orders Flow", path: "/manager/orders", icon: "reorder" },
    { name: "Product Menu", path: "/manager/products", icon: "restaurant_menu" },
    { name: "Analytics", path: "/manager/analytics", icon: "query_stats" },
    { name: "Staff Settings", path: "/manager/staff", icon: "groups" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFA] font-sans selection:bg-primary selection:text-white">
      {/* Sidebar - Manager Specific (Purple Accents for distinction) */}
      <aside className="w-full md:w-72 flex-shrink-0 flex flex-col bg-white border-r border-slate-100 relative z-20 shadow-sm">
        <div className="p-8 h-20 flex items-center border-b border-slate-50">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-slate-900 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg">
              <span className="material-symbols-outlined text-white text-2xl">restaurant</span>
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight text-center w-full">Qrave <span className="text-primary italic">Manager</span></span>
          </Link>
        </div>

        <div className="flex-1 py-10 px-6 flex flex-col gap-1.5 overflow-y-auto">
          <p className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 text-center">Operation Management</p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className={`material-symbols-outlined transition-colors ${isActive ? "text-orange-400" : "text-slate-400 group-hover:text-slate-600"}`}>
                  {item.icon}
                </span>
                <span className="font-bold text-sm tracking-wide">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-400 shadow-sm shadow-orange-100/50"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* User Card */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 mt-auto">
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-orange-400 font-black text-lg shadow-inner">
              {user?.name?.charAt(0).toUpperCase() || "M"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-slate-900 truncate">
                {user?.name || "Manager"}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user?.role || "Manager"}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full py-3.5 flex items-center justify-center gap-3 rounded-2xl text-sm font-bold text-slate-500 bg-white hover:bg-red-50 hover:text-red-500 border border-slate-100 hover:border-red-200 transition-all shadow-sm active:scale-95 group"
          >
            <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">logout</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 flex-shrink-0 bg-white border-b border-slate-100 flex items-center justify-between px-10">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Manager Console / <span className="text-slate-900">{navItems.find(i => location.pathname === i.path)?.name || "Overview"}</span></h2>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-100 rounded-xl">
               <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
               <span className="text-[10px] font-black text-primary uppercase">12 Pending Tasks</span>
             </div>
             <div className="h-6 w-px bg-slate-200"></div>
             <button className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                </div>
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 relative">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
          
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
