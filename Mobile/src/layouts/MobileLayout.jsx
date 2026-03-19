import React from "react";
import { Link, useLocation } from "react-router-dom";

const MobileLayout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { icon: "home", label: "Home", path: "/" },
    { icon: "menu_book", label: "Menu", path: "/menu" },
    { icon: "shopping_basket", label: "Cart", path: "/cart" },
    { icon: "receipt_long", label: "Orders", path: "/orders" },
  ];

  return (
    <div className="mobile-container overflow-hidden pb-10">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto mb-20 scroll-smooth no-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-white/90 backdrop-blur-xl border-t border-slate-50 z-[100] flex items-center justify-around px-4 shadow-sm">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1.5 transition-all duration-300 w-20 py-2 rounded-3xl ${
              location.pathname === item.path 
              ? "bg-orange-50 text-primary" 
              : "text-slate-400"
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${location.pathname === item.path ? "fill-1 font-black" : ""}`}>
              {item.icon}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileLayout;
