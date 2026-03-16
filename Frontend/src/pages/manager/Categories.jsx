import React, { useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Main Course", items: 24, status: "Active" },
    { id: 2, name: "Drinks", items: 42, status: "Active" },
    { id: 3, name: "Salad", items: 8, status: "Active" },
    { id: 4, name: "Dessert", items: 12, status: "Active" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newCat, setNewCat] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if(!newCat.trim()) return;
    setCategories([...categories, { id: Date.now(), name: newCat, items: 0, status: "Active" }]);
    setNewCat("");
    setShowModal(false);
  };

  const toggleStatus = (id) => {
    setCategories(categories.map(c => c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c));
  };

  return (
    <div className="w-full max-w-5xl">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
           <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">Menu <span className="text-purple-500">Categories</span></h1>
           <p className="text-white/50 text-lg">Organize your offerings for the digital menu.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => (
          <div key={cat.id} className="bg-[#111] border border-white/5 p-6 rounded-3xl flex justify-between items-center group hover:border-purple-500/30 transition-colors">
            <div>
              <h3 className="text-xl font-bold mb-1 group-hover:text-purple-400 transition-colors">{cat.name}</h3>
              <p className="text-white/40 text-sm">{cat.items} Products Associated</p>
            </div>
            <div className="flex gap-4 items-center">
              <button 
                onClick={() => toggleStatus(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold border ${cat.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-white/5 text-white/40 border-white/10'}`}
              >
                {cat.status}
              </button>
              <button className="text-white/20 hover:text-red-500 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

       {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-white/50 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <h2 className="text-2xl font-bold mb-6">New Category</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">Category Name</label>
                <input required type="text" value={newCat} onChange={e => setNewCat(e.target.value)} className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 text-white" placeholder="e.g. Seafood" />
              </div>
              <button type="submit" className="w-full py-4 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors mt-6">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
