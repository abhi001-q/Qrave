import React from "react";

const categories = [
  { label: "All" },
  { label: "Main Course" },
  { label: "Drinks" },
  { label: "Salad" },
  { label: "Dessert" },
];

export default function CategoryFilter({ activeCategory, onSelect }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-2 rounded-full border border-slate-100 shadow-sm">
      {categories.map((cat) => (
        <button
          key={cat.label}
          onClick={() => onSelect(cat.label)}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
            activeCategory === cat.label
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "text-slate-500 hover:text-primary hover:bg-orange-50"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
