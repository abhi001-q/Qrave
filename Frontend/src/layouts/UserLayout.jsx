import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function UserLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "My Board", path: "/dashboard", icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" },
    { name: "Order History", path: "/orders", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" },
    { name: "Book Table", path: "/book-table", icon: "M16 2v4 M8 2v4 M3 10h18" },
    { name: "Profile", path: "/profile", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
    { name: "Digital Menu", path: "/menu", icon: "M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#050505] text-white font-sans selection:bg-orange-500 selection:text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 flex flex-col bg-[#0f0f0f] border-r border-white/5 relative z-20">
        <div className="p-6 h-20 flex items-center border-b border-white/5">
          <Link to="/" className="text-2xl font-black tracking-tighter w-full">
            <span className="text-orange-500">Q</span>
            <span className="text-white">rave</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-r from-orange-500/20 to-transparent text-orange-400 font-bold border-l-2 border-orange-500" 
                    : "text-white/50 hover:text-white hover:bg-white/5 font-medium border-l-2 border-transparent"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isActive ? "text-orange-500" : "text-white/30"}>
                  <path d={item.icon}/>
                  {item.name === "Book Table" && <rect x="3" y="4" width="18" height="18" rx="2"/>}
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 bg-[#050505]/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 flex items-center justify-center font-bold text-sm shadow-lg">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">{user?.name || 'User'}</p>
              <p className="text-xs text-white/40">{user?.role || 'Guest'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl text-sm font-bold text-white/50 bg-[#111] hover:bg-red-500/10 hover:text-red-500 border border-white/5 hover:border-red-500/20 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 relative overflow-y-auto custom-scrollbar">
        {/* Background ambient light */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="p-6 md:p-10 relative z-10 w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
