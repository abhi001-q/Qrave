import React from "react";
import { useCart } from "../hooks/useCart";

export default function DishCard({ id, title, price, image, description }) {
  const { addItem } = useCart();

  return (
    <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden group hover:border-orange-500/30 transition-all duration-500 flex flex-col h-full relative cursor-pointer">
      <div className="h-56 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent z-10"></div>
        <img
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
          src={image}
        />
        <div className="absolute top-4 right-4 z-20 bg-[#050505]/60 backdrop-blur-md p-2 rounded-full border border-white/10 text-white/50 hover:text-red-500 hover:border-red-500/50 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative z-20 -mt-8">
        <div className="bg-[#0f0f0f] border border-white/10 px-4 py-1.5 rounded-full self-start mb-4 shadow-xl">
          <span className="text-orange-400 font-bold tracking-wider">{price}</span>
        </div>
        
        <h3 className="font-extrabold text-xl mb-2 text-white leading-tight">
          {title}
        </h3>
        
        <p className="text-white/40 text-sm mb-6 flex-grow line-clamp-2 leading-relaxed">
          {description || "A culinary masterpiece prepared with the finest ingredients to satisfy your cravings."}
        </p>

        <button 
          onClick={(e) => { e.stopPropagation(); addItem({ id, title, price: parseFloat(price.replace(/[^0-9.-]+/g,"")), image, quantity: 1 }); }}
          className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold flex items-center justify-center gap-2 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add to Order
        </button>
      </div>
    </div>
  );
}
