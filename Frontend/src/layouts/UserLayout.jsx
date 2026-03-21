import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

export default function UserLayout() {
  const location = useLocation();

  const navItems = [
    { name: "My Board", path: "/dashboard" },
    { name: "Order History", path: "/orders" },
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
        <header className="h-20 flex-shrink-0 bg-white border-b border-slate-100 flex items-center justify-between px-10">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Dashboard / <span className="text-slate-900">{currentPage}</span>
            </h2>
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
