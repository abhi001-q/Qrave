import React from "react";
import { useCart } from "../hooks/useCart";

export default function DishCard({ id, name, title, price, image, description }) {
  const { addItem } = useCart();
  const displayName = name || title || "Untitled Dish";
  const displayPrice = typeof price === 'number' ? `$${price.toFixed(2)}` : price;

  return (
    <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full relative cursor-pointer shadow-sm">
      <div className="h-48 overflow-hidden relative">
        <img
          alt={displayName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          src={image}
        />
        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md w-10 h-10 rounded-xl flex items-center justify-center border border-white/20 text-slate-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
           <span className="material-symbols-outlined text-xl">favorite</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-20 -mt-8 bg-white rounded-t-[32px]">
        <div className="flex justify-between items-start mb-3">
          <div className="bg-orange-50 px-3 py-1 rounded-full border border-orange-100/50">
            <span className="text-primary font-black text-[10px] uppercase tracking-[0.15em]">
              {displayPrice}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-black text-slate-900 mb-1.5 leading-tight group-hover:text-primary transition-colors truncate">
          {displayName}
        </h3>

        <p className="text-slate-500 text-xs mb-6 flex-grow line-clamp-2 leading-relaxed font-medium">
          {description ||
            "A culinary masterpiece prepared with the finest ingredients."}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addItem({
              id,
              title: displayName,
              price: typeof price === 'number' ? price : parseFloat(String(price).replace(/[^0-9.-]+/g, "")),
              image,
              quantity: 1,
            });
          }}
          className="btn-primary w-full py-3 text-xs flex items-center justify-center gap-2 group/btn relative overflow-hidden shadow-lg shadow-primary/10"
        >
          <span className="material-symbols-outlined text-lg group-hover/btn:rotate-12 transition-transform">add_shopping_cart</span>
          <span className="font-bold uppercase tracking-widest text-[10px]">Add to Order</span>
        </button>
      </div>
    </div>
  );
}
