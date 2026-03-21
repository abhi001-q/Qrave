import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DishCard from "../../components/DishCard";
import CategoryFilter from "../../components/CategoryFilter";
import { menuService } from "../../services/menuService";
import CartPanel from "../../components/CartPanel";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract filters from URL Search Params
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All";

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const data = await menuService.getAll();
        const mappedData = (data || []).map((item) => ({
          ...item,
          category: item.category_name || item.category || "Other",
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

  const handleCategorySelect = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === "All") params.delete("category");
    else params.set("category", cat);
    setSearchParams(params);
  };

  const filteredDishes = dishes.filter((d) => {
    // Backend uses category_id or category_name, frontend expects 'category'
    const itemCategory = d.category_name || d.category;
    const matchesCategory = category === "All" || itemCategory === category;
    
    // Backend uses 'name', frontend was expecting 'title'
    const name = d.name || d.title || "";
    const description = d.description || "";
    
    const matchesSearch =
      name.toLowerCase().includes(query.toLowerCase()) ||
      description.toLowerCase().includes(query.toLowerCase());
      
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex bg-[#FAFAFA] min-h-full">
      {/* 1. Main Center Content Area */}
      <main className="flex-1 min-w-0 flex flex-col bg-[#FAFAFA] relative">
        <div className="px-10 lg:px-16 py-8 pb-32">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Category Filter Pills (Sticky) */}
            <div className="sticky top-0 z-30 transition-all bg-[#FAFAFA]/80 backdrop-blur-md pt-4 pb-2">
              <div className="flex items-center gap-4 p-2 rounded-[32px] animate-in fade-in slide-in-from-top-4 duration-700">
                <CategoryFilter
                  activeCategory={category}
                  onSelect={handleCategorySelect}
                />
              </div>
            </div>

            {/* Page Header Selection Info */}
            <div className="flex items-baseline justify-between border-b border-slate-100/60 pb-8 pt-2">
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-primary/20 rounded-full"></span>
                  <p className="text-[11px] font-black text-primary uppercase tracking-[0.4em] opacity-90 leading-none">
                    Explore Flavors
                  </p>
                </div>
                <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                  {category}{" "}
                  <span className="text-primary not-italic tracking-tighter italic normal-case">
                    Selection
                  </span>
                </h2>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                  {filteredDishes.length} Items found
                </p>
                {query && (
                  <p className="text-xs font-bold text-slate-500">
                    Searching for:{" "}
                    <span className="text-primary font-black italic">"{query}"</span>
                  </p>
                )}
              </div>
            </div>

            {loading ? (
              <div className="h-[50vh] flex flex-col justify-center items-center gap-8 bg-white/50 rounded-[48px] border border-white shadow-sm">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin shadow-inner"></div>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                  Restocking the virtual kitchen...
                </p>
              </div>
            ) : filteredDishes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 lg:gap-11 px-2">
                {filteredDishes.map((dish) => (
                  <DishCard key={dish.id} {...dish} />
                ))}
              </div>
            ) : (
              <div className="h-[55vh] flex flex-col items-center justify-center text-center animate-in zoom-in duration-700 bg-white rounded-[60px] border border-slate-100 shadow-xl shadow-slate-200/50 p-12 max-w-4xl mx-auto group">
                <div className="w-32 h-32 rounded-[48px] bg-slate-50 flex items-center justify-center text-slate-200 mb-10 shadow-inner border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                  <div className="relative">
                    <span className="material-symbols-outlined text-6xl font-light scale-125">
                      search_off
                    </span>
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full border-4 border-white"></div>
                  </div>
                </div>
                <h3 className="text-slate-900 font-black text-3xl mb-4 tracking-tight">
                  No flavor matches
                </h3>
                <p className="text-slate-500 font-bold text-lg max-w-md leading-relaxed opacity-80 mb-10">
                  Your craving for{" "}
                  <span className="text-primary italic">
                    "{query || category}"
                  </span>{" "}
                  didn't return any results. Try adjusting your search or
                  category filter to find something delicious!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* 2. Right Sidebar - Fixed Cart Panel */}
      <aside className="hidden xl:block w-[440px] flex-shrink-0 bg-white border-l border-slate-100 shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.03)] relative z-40">
        <div className="sticky top-0 h-[calc(100vh-6rem)] overflow-hidden">
          <CartPanel />
        </div>
      </aside>
    </div>
  );
}
