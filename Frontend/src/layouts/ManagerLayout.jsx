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
    { name: "Overview", path: "/manager", icon: "M21.21 15.89A10 10 0 1 1 8 2.83 M22 12A10 10 0 0 0 12 2v10z" },
    { name: "Live Orders", path: "/manager/orders", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" },
    { name: "Products", path: "/manager/products", icon: "M20 16.2A2 2 0 0 0 21.6 14L22 10a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2l.4 4a2 2 0 0 0 1.6 2.2V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z" },
    { name: "Categories", path: "/manager/categories", icon: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8 M8 4h1" },
    { name: "Tables", path: "/manager/tables", icon: "M16 2v4 M8 2v4 M3 10h18 M4 10v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10" },
    { name: "Billing", path: "/manager/bills", icon: "M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
    { name: "Settings", path: "/manager/profile", icon: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#080808] text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 flex flex-col bg-[#111111] shadow-[4px_0_24px_rgba(0,0,0,0.5)] border-r border-white/5 relative z-20">
        <div className="p-6 h-20 flex items-center border-b border-white/5">
          <Link to="/" className="text-2xl font-black tracking-tighter w-full">
            <span className="text-purple-500">Q</span>
            <span className="text-white">rave <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest ml-1">Manager</span></span>
          </Link>
        </div>
        
        <nav className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] font-black uppercase text-white/30 tracking-widest mb-2">Management</p>
          {navItems.map((item) => {
            // exact match for /manager, startswith for others
            const isActive = item.path === '/manager' 
              ? location.pathname === '/manager' 
              : location.pathname.startsWith(item.path);
              
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-r from-purple-500/20 to-transparent text-purple-400 font-bold border-l-2 border-purple-500" 
                    : "text-white/50 hover:text-white hover:bg-white/5 font-medium border-l-2 border-transparent"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isActive ? "text-purple-500" : "text-white/40"}>
                  {item.icon.split(' M').map((pathD, i) => (
                    <path key={i} d={i === 0 ? pathD : 'M' + pathD}/>
                  ))}
                  {item.name === "Tables" && <rect x="4" y="10" width="16" height="10" rx="2" />}
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/5 bg-[#0a0a0a]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center font-bold text-sm shadow-lg shadow-purple-500/20 border-2 border-[#111]">
              {user?.name?.charAt(0) || 'M'}
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">{user?.name || 'Manager'}</p>
              <p className="text-xs text-white/40 uppercase tracking-wider">{user?.role || 'MANAGER'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 flex items-center justify-center gap-2 rounded-xl text-sm font-bold text-white/50 bg-[#151515] hover:bg-red-500/10 hover:text-red-500 border border-white/5 hover:border-red-500/20 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 relative overflow-y-auto custom-scrollbar">
        {/* Background ambient light */}
        <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="p-6 md:p-12 relative z-10 w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
