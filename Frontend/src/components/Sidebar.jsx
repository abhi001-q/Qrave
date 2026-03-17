import React from "react";

const navLinks = [
  { icon: "grid_view", label: "Menu", active: true },
  { icon: "event_seat", label: "Book Table" },
  { icon: "receipt_long", label: "Order" },
];

export default function Sidebar() {
  return (
    <aside className="w-20 lg:w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white/90 dark:bg-background-dark/80 backdrop-blur-xl shadow-xl transition-all">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary rounded-xl p-2 flex items-center justify-center">
          <span className="material-symbols-outlined text-white">
            restaurant
          </span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight hidden lg:block drop-shadow-sm">
          Qrave
        </h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navLinks.map((link, idx) => (
          <a
            key={link.label}
            href="#"
            className={`flex items-center gap-3 px-3 py-3 rounded-xl ${
              link.active
                ? "bg-primary text-white shadow-lg scale-105"
                : "hover:bg-primary/10 hover:text-primary text-slate-600 dark:text-slate-400"
            }`}
          >
            <span
              className={`material-symbols-outlined ${link.active ? "text-white" : "text-primary/80 group-hover:text-primary"}`}
            >
              {link.icon}
            </span>
            <span className="font-semibold hidden lg:block tracking-wide">
              {link.label}
            </span>
          </a>
        ))}
        <a
          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
          href="#"
        >
          <span className="font-medium hidden lg:block"></span>
        </a>
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button className="flex w-full items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">
          <span className="material-symbols-outlined">logout</span>
          <span className="font-medium hidden lg:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}
