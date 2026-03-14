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
    <div className="flex flex-wrap items-center justify-center gap-3 bg-[#111] p-2 rounded-full border border-white/5">
      {categories.map((cat) => (
        <button
          key={cat.label}
          onClick={() => onSelect(cat.label)}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
            activeCategory === cat.label
              ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              : "text-white/50 hover:text-white hover:bg-white/5"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
