import React, { useState, useEffect, useRef } from "react";
import { menuService } from "../../services/menuService";
import { toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    "Main Course",
    "Drinks",
    "Salad",
    "Dessert",
  ]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Main Course",
    description: "",
    image: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await menuService.getAll();
        setProducts(response || []);
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName)) {
      setCategories([...categories, newCategoryName]);
      setFormData({ ...formData, category: newCategoryName });
      setIsAddingCategory(false);
      setNewCategoryName("");
      toast.success("New category added!");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const newProductData = {
        ...formData,
        status: "Active",
        price: parseFloat(formData.price),
      };
      const created = await menuService.create(newProductData);
      setProducts([created, ...products]);
      setShowModal(false);
      setFormData({
        title: "",
        price: "",
        category: categories[0] || "Main Course",
        description: "",
        image: null,
      });
      toast.success("Product added successfully!");
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  const toggleStatus = async (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const newStatus = product.status === "Active" ? "Inactive" : "Active";
    try {
      await menuService.update(id, { ...product, status: newStatus });
      setProducts(
        products.map((p) =>
          p.id === id ? { ...p, status: newStatus } : p
        )
      );
      toast.success(`Status updated to ${newStatus}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this dish?")) return;
    try {
      await menuService.remove(id);
      setProducts(products.filter(p => p.id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Menu <span className="text-purple-600">Inventory</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            High-performance catalog management for your cuisine.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 active:scale-95 group"
        >
          <span className="material-symbols-outlined transition-transform group-hover:rotate-90">
            add
          </span>
          Add New Dish
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Dish Information
                </th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">
                  Category
                </th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">
                  Price
                </th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">
                  Status
                </th>
                <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin"></div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Fetching menu...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-20 text-center">
                    <p className="text-slate-400 font-bold">No products found.</p>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="p-8">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-3xl bg-slate-100 overflow-hidden border border-slate-100 shadow-inner group-hover:scale-105 transition-transform">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <span className="material-symbols-outlined text-2xl">
                                image
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                            {product.title}
                          </h3>
                          <p className="text-xs font-bold text-slate-400 mt-0.5 truncate max-w-[200px]">
                            {product.description || "No description provided."}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-8 text-center text-sm font-bold text-slate-500">
                      <span className="px-3 py-1 bg-slate-50 rounded-lg text-slate-600">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-8 text-center">
                      <span className="text-lg font-black text-slate-900 tracking-tight">
                        ${Number(product.price).toFixed(2)}
                      </span>
                    </td>
                    <td className="p-8 text-center">
                      <button
                        onClick={() => toggleStatus(product.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                          product.status === "Active"
                            ? "bg-green-50 text-green-600 border-green-100 hover:bg-green-100/50"
                            : "bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100/50 text-slate-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${product.status === "Active" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-slate-300"}`}
                        ></span>
                        {product.status}
                      </button>
                    </td>
                    <td className="p-8 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="w-10 h-10 rounded-xl bg-white text-slate-400 border border-slate-100 hover:text-purple-600 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100 transition-all flex items-center justify-center group/btn">
                          <span className="material-symbols-outlined text-xl group-hover/btn:scale-110 transition-transform">
                            edit_note
                          </span>
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="w-10 h-10 rounded-xl bg-white text-slate-400 border border-slate-100 hover:text-red-500 hover:border-red-200 hover:shadow-lg hover:shadow-red-100 transition-all flex items-center justify-center group/btn">
                          <span className="material-symbols-outlined text-xl group-hover/btn:rotate-12 transition-transform">
                            delete_outline
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-10 w-full max-w-2xl shadow-2xl relative border border-white/20 animate-in zoom-in-95 duration-500">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center justify-center"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <header className="mb-8">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Add <span className="text-purple-600">New dish</span>
              </h2>
              <p className="text-slate-500 font-medium">
                Populate your menu with professional details.
              </p>
            </header>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
              <div className="md:col-span-1 space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
                    Product Title
                  </label>
                  <input
                    required
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Grilled Salmon"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 text-slate-900 font-bold transition-all"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
                    Price ($)
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 text-slate-900 font-bold transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2 px-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                      Category
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsAddingCategory(!isAddingCategory)}
                      className="text-[10px] font-black uppercase text-purple-600 hover:underline"
                    >
                      {isAddingCategory ? "Select Existing" : "+ New"}
                    </button>
                  </div>
                  {isAddingCategory ? (
                    <div className="flex gap-2 animate-in slide-in-from-top-2">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="New category..."
                        className="flex-1 bg-purple-50 border border-purple-100 rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-purple-200 text-slate-900 font-bold text-sm"
                      />
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        className="bg-purple-600 text-white px-4 rounded-2xl hover:bg-purple-700 transition-colors"
                      >
                        <span className="material-symbols-outlined">check</span>
                      </button>
                    </div>
                  ) : (
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 text-slate-900 font-bold transition-all appearance-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="md:col-span-1 space-y-6 flex flex-col">
                <div className="flex-1 flex flex-col">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
                    Dish Perspective (Image)
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center p-6 hover:bg-purple-50/50 hover:border-purple-200 transition-all cursor-pointer group relative overflow-hidden"
                  >
                    {formData.image ? (
                      <>
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                           <span className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                             <span className="material-symbols-outlined">add_a_photo</span>
                             Change Media
                           </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 mb-4 group-hover:text-purple-600 transition-colors">
                          <span className="material-symbols-outlined text-3xl">upload_file</span>
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center leading-relaxed">
                          Drop your dish photo<br/><span className="text-[10px] font-medium text-slate-400">(Max 2MB, JPG/PNG)</span>
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">
                    Quick Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell the story of this dish..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 text-slate-900 font-medium h-28 resize-none transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl font-black text-base uppercase tracking-[0.2em] shadow-2xl shadow-purple-200 hover:shadow-purple-300 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  Authorize Dish Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
