import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Main Course", items: 24, status: "Active", icon: "restaurant" },
    { id: 2, name: "Drinks", items: 42, status: "Active", icon: "local_bar" },
    { id: 3, name: "Salad", items: 8, status: "Active", icon: "eco" },
    { id: 4, name: "Dessert", items: 12, status: "Active", icon: "icecream" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newCat, setNewCat] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    setCategories([
      ...categories,
      { id: Date.now(), name: newCat, items: 0, status: "Active", icon: "category" },
    ]);
    setNewCat("");
    setShowModal(false);
    toast.success("Category created successfully!");
  };

  const toggleStatus = (id) => {
    setCategories(
      categories.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c,
      ),
    );
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Menu <span className="text-purple-600">Categories</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Structural organization of your restaurant offerings.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 active:scale-95 group"
        >
          <span className="material-symbols-outlined transition-transform group-hover:rotate-90">
            add
          </span>
          Create Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-slate-100 p-8 rounded-[40px] flex flex-col gap-6 group hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50 transition-all relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-purple-600">
               <span className="material-symbols-outlined text-8xl">{cat.icon}</span>
            </div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 hover:text-purple-600 transition-all flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </button>
                <button className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 hover:text-red-500 transition-all flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl font-black text-slate-900 mb-1">
                {cat.name}
              </h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {cat.items} Products Associated
              </p>
            </div>

            <div className="flex justify-between items-center mt-2 relative z-10">
              <button
                onClick={() => toggleStatus(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                  cat.status === "Active"
                    ? "bg-green-50 text-green-600 border-green-100 hover:bg-green-100/50 text-green-600"
                    : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100/50 text-slate-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${cat.status === "Active" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-slate-300"}`}
                ></span>
                {cat.status}
              </button>
              
              <span className="material-symbols-outlined text-slate-200 group-hover:text-purple-300 transition-colors">chevron_right</span>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-10 w-full max-w-md shadow-2xl relative border border-white/20 animate-in zoom-in-95 duration-500">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center justify-center"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <header className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                New <span className="text-purple-600">Category</span>
              </h2>
              <p className="text-slate-500 font-medium">Create a new container for your products.</p>
            </header>

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
                  Category Name
                </label>
                <input
                  required
                  type="text"
                  value={newCat}
                  onChange={(e) => setNewCat(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 text-slate-900 font-bold transition-all"
                  placeholder="e.g. Seafood Special"
                />
              </div>
              <button
                type="submit"
                className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl font-black text-base uppercase tracking-[0.2em] shadow-2xl shadow-purple-200 hover:shadow-purple-300 hover:scale-[1.01] active:scale-[0.99] transition-all mt-4"
              >
                Create Category
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
