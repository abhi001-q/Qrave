import React from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

export default function UserLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const handleSearch = (e) => {
    const query = e.target.value;
    if (location.pathname !== "/menu") {
      navigate(`/menu?q=${encodeURIComponent(query)}`);
    } else {
      const params = new URLSearchParams(searchParams);
      if (query) params.set("q", query);
      else params.delete("q");
      navigate(`/menu?${params.toString()}`, { replace: true });
    }
  };

  const navItems = [
    { name: "My Board", path: "/dashboard" },
    { name: "Order History", path: "/orders" },
    { name: "Track Order", path: "/orders" },
    { name: "Book Table", path: "/book-table" },
    { name: "Digital Menu", path: "/menu" },
    { name: "Profile", path: "/profile" },
  ];

  const currentPage = navItems.find((i) => location.pathname === i.path)?.name || "Overview";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFA] font-sans selection:bg-primary selection:text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-24 flex-shrink-0 bg-white border-b border-slate-100 flex items-center justify-between px-10 relative z-50">
          <div className="flex flex-col">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">
              Dashboard / <span className="text-slate-900">{currentPage}</span>
            </h2>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest hidden md:block">Welcome back, happy ordering!</p>
          </div>

          {/* Global Search Bar */}
          <div className="flex-1 max-w-2xl px-12 hidden lg:block">
            <div className="relative group">
               <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors duration-300">search</span>
               <input 
                 type="text" 
                 placeholder="Search dishes, flavors, or ingredients..."
                 className="w-full bg-slate-50/50 border border-slate-100 rounded-[20px] py-3.5 pl-14 pr-6 text-sm font-bold text-slate-900 placeholder:text-slate-300 outline-none focus:bg-white focus:ring-[6px] focus:ring-primary/5 focus:border-primary/20 transition-all duration-500 shadow-sm"
                 value={searchQuery}
                 onChange={handleSearch}
               />
            </div>
          </div>
          <div className="flex items-center gap-6">
             <button className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-primary transition-colors hover:bg-orange-50 rounded-xl">
               <span className="material-symbols-outlined">notifications</span>
               <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
             </button>
             <div className="h-6 w-px bg-slate-200"></div>
             <button className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-lg">settings</span>
                </div>
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
          
          <div className={`${location.pathname === '/menu' ? 'w-full' : 'max-w-6xl mx-auto p-8 md:p-12'}`}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
