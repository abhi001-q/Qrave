import React from "react";

const categories = [
  { icon: "grid_view", label: "All", active: true },
  { icon: "restaurant_menu", label: "Main Course" },
  { icon: "local_bar", label: "Drinks" },
  { icon: "soup_kitchen", label: "Soup" },
  { icon: "flatware", label: "Salad" },
];

export default function CategoryFilter() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat.label}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              cat.active
                ? "bg-primary text-white"
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {cat.icon}
            </span>{" "}
            {cat.label}
          </button>
        ))}
      </div>
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0">
        <button className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white">
          VEG
        </button>
        <button className="px-4 py-1.5 rounded-lg text-xs font-bold transition-all text-slate-500 dark:text-slate-400">
          NON-VEG
        </button>
      </div>
    </div>
  );
}
