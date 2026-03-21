import React, { useState, useEffect } from "react";
import DishCard from "../../components/DishCard";
import CategoryFilter from "../../components/CategoryFilter";
import { menuService } from "../../services/menuService";
import CartPanel from "../../components/CartPanel";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const data = await menuService.getAll();
        // Map backend category_name to category for the frontend filters
        const mappedData = (data || []).map(item => ({
          ...item,
          category: item.category_name || item.category || "Other"
        }));
        setDishes(mappedData);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, []);

  const filteredDishes = dishes.filter((d) => {
    const matchesCategory = activeCategory === "All" || d.category === activeCategory;
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (d.description && d.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden bg-white lg:bg-[#FAFAFA]">
      {/* 1. Main Center Content */}
      <main className="flex-1 min-w-0 flex flex-col h-full bg-white lg:bg-[#FAFAFA] relative">
        {/* Top Search Bar Pane */}
        <header className="h-20 flex-shrink-0 bg-white border-b border-slate-100 flex items-center px-6 lg:px-10 gap-8 sticky top-0 z-40">
          <div className="flex-1 flex items-center bg-slate-50 rounded-2xl border border-slate-100 px-4 group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10 transition-all duration-300">
            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input 
              type="text" 
              placeholder="Search dishes, flavors, or ingredients..."
              className="w-full bg-transparent border-none py-3 px-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
             <button className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:bg-orange-50 rounded-xl border border-slate-100 lg:border-none shadow-sm lg:shadow-none bg-white lg:bg-transparent">
               <span className="material-symbols-outlined">filter_list</span>
             </button>
          </div>
        </header>

        {/* Categories & Grid Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 lg:px-10 py-8 space-y-12 pb-24">
          <div className="flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
            <CategoryFilter
              activeCategory={activeCategory}
              onSelect={setActiveCategory}
            />
          </div>

          <div className="space-y-6">
            <div className="flex items-baseline justify-between mb-8 px-2">
               <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none italic uppercase">
                    {activeCategory} <span className="text-primary not-italic tracking-tighter normal-case">Selection</span>
                  </h2>
               </div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{filteredDishes.length} Items found</p>
            </div>

            {loading ? (
              <div className="h-[60vh] flex flex-col justify-center items-center gap-6">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin shadow-inner"></div>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Preparing the latest menu...</p>
              </div>
            ) : filteredDishes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 pb-12">
                {filteredDishes.map((dish) => (
                  <DishCard key={dish.id} {...dish} />
                ))}
              </div>
            ) : (
              <div className="h-[60vh] flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                 <div className="w-24 h-24 rounded-[40px] bg-slate-50 flex items-center justify-center text-slate-200 mb-8 shadow-inner border border-slate-100">
                   <span className="material-symbols-outlined text-5xl font-light">shopping_basket_off</span>
                 </div>
                 <h3 className="text-slate-900 font-black text-2xl mb-2 tracking-tight">No flavor matches</h3>
                 <p className="text-slate-500 font-bold text-sm max-w-xs leading-relaxed">We couldn't find any dishes matching "{searchQuery}" in our {activeCategory} section.</p>
                 <button 
                  onClick={() => {setSearchQuery(""); setActiveCategory("All");}}
                  className="mt-8 text-primary font-black text-xs uppercase tracking-[0.2em] hover:underline underline-offset-8 transition-all"
                 >
                   Reset All Filters
                 </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 2. Right Sidebar - The Cart Panel */}
      <aside className="hidden xl:block w-[420px] flex-shrink-0 h-full relative z-40 bg-white border-l border-slate-100 shadow-[-20px_0_50px_-20px_rgba(0,0,0,0.05)]">
        <CartPanel />
      </aside>
    </div>
  );
}
