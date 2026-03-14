import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { name: "System Overview", path: "/admin", icon: "M2 22l10-10 4 4 6-6 M16 4h6v6" },
    { name: "Users", path: "/admin/users", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" },
    { name: "Manager Approvals", path: "/admin/managers", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4" },
    { name: "System Health", path: "/admin/system", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
    { name: "Settings", path: "/admin/settings", icon: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#000] text-white font-sans selection:bg-red-500 selection:text-white">
      {/* Sidebar Focus Area */}
      <aside className="w-full md:w-64 flex-shrink-0 flex flex-col bg-[#050505] border-r border-white/10 relative z-20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="p-6 h-20 flex items-center border-b border-white/10 relative z-10">
          <Link to="/" className="text-2xl font-black tracking-tighter w-full">
            <span className="text-red-500">Q</span>
            <span className="text-white">rave <span className="text-[10px] uppercase font-bold text-red-500/80 tracking-widest ml-1 bg-red-500/10 px-2 py-0.5 rounded-sm">Admin</span></span>
          </Link>
        </div>
        
        <nav className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar relative z-10">
          <p className="px-4 text-[10px] font-black uppercase text-white/30 tracking-widest mb-2">System Controls</p>
          {navItems.map((item) => {
            const isActive = item.path === '/admin' 
              ? location.pathname === '/admin' 
              : location.pathname.startsWith(item.path);
              
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive 
                    ? "bg-red-500 text-white font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)]" 
                    : "text-white/50 hover:text-white hover:bg-white/5 font-medium"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isActive ? "text-white" : "text-white/40"}>
                  {item.icon.split(' M').map((pathD, i) => (
                    <path key={i} d={i === 0 ? pathD : 'M' + pathD}/>
                  ))}
                </svg>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10 bg-black/50 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center font-bold text-sm shadow-lg shadow-red-500/20 border-2 border-red-400 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">System Admin</p>
              <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold">God Mode</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 flex items-center justify-center gap-2 rounded-lg text-sm font-bold text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Emergency Exit
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 relative overflow-y-auto custom-scrollbar">
        {/* Background ambient light */}
        <div className="fixed top-0 left-64 w-full h-[300px] bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none"></div>
        <div className="p-6 md:p-12 relative z-10 w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
