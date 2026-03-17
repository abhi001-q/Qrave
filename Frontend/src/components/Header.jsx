import React from "react";

export default function Header() {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark px-6 flex items-center justify-between">
      <div className="flex-1 max-w-2xl relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>
        <input
          className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary/50 text-sm"
          placeholder="Search Product here..."
          type="text"
        />
      </div>
      <div className="flex items-center gap-4 ml-4">
        <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
          <span className="material-symbols-outlined">tune</span>
        </button>
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
          <span className="text-primary font-bold text-xs">JD</span>
        </div>
      </div>
    </header>
  );
}
