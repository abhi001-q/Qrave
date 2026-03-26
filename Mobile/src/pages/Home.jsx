import React, { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

const Home = () => {
  const [categories] = useState(["All", "Burger", "Pizza", "Drinks", "Bowls"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/menu")
      .then(res => setMenuItems(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = menuItems.filter(item => {
    const itemName = item.title || item.name || "";
    const itemCategory = item.category || item.category_name || "All";
    
    const matchesSearch = itemName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || itemCategory === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success(`${item.title || item.name} added to cart!`);
  };

  return (
    <div className="pb-10">
      {/* Header & Search */}
      <div className="p-6 pt-0 space-y-6">
        <div className="flex flex-col items-center justify-center pt-4">
          <h1 className="text-3xl font-black text-primary tracking-tighter">Qrave</h1>
        </div>

        <div className="relative group">
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary font-bold">search</span>
          <input 
            type="text" 
            placeholder="Search for your cravings..."
            className="input-field pl-14 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto px-6 pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pill-category ${activeCategory === cat ? "pill-active" : "pill-inactive"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="p-6 grid grid-cols-2 gap-4">
        {filteredItems.map((item, idx) => (
          <div 
            key={item.id} 
            className="card-dish group animate-slide-up"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="relative aspect-square rounded-[2rem] overflow-hidden mb-4 shadow-sm">
              <img 
                src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1480&auto=format&fit=crop"} 
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
            <div className="space-y-1 px-1">
              <h3 className="font-black text-slate-800 text-lg leading-tight truncate">{item.title || item.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold leading-tight line-clamp-2 min-h-[2.5em]">
                {item.description || "Freshly prepared with the finest ingredients."}
              </p>
              <div className="flex justify-between items-center pt-2">
                <span className="text-primary font-black text-lg">Rs. {item.price}</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-90 transition-all"
                >
                  <span className="material-symbols-outlined font-black">add</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {!loading && menuItems.length === 0 && (
          <div className="col-span-2 py-20 text-center">
            <p className="text-slate-400 font-bold">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
