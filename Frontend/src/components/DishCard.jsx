import React from "react";

export default function DishCard({ title, price, image }) {
  return (
    <div className="bg-white/90 dark:bg-background-dark/80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group hover:shadow-2xl shadow-lg transition-all duration-300 backdrop-blur-xl">
      <div className="h-40 overflow-hidden relative">
        <img
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          src={image}
        />
        <div className="absolute top-2 right-2 bg-white/80 dark:bg-black/60 p-1 rounded-lg backdrop-blur-md shadow-md">
          <span className="material-symbols-outlined text-primary text-base drop-shadow">
            favorite
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-extrabold text-base mb-1 line-clamp-1 tracking-tight drop-shadow-sm">
          {title}
        </h3>
        <p className="text-primary font-extrabold text-xl mb-4 drop-shadow">
          {price}
        </p>
        <button className="w-full py-2.5 rounded-xl bg-primary text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/80 active:scale-95 transition-all shadow-md">
          <span className="material-symbols-outlined text-lg">add_circle</span>{" "}
          Add Dish
        </button>
      </div>
    </div>
  );
}
