import React, { useState, useEffect } from "react";
import { menuService } from "../../services/menuService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Main Course",
    description: "",
  });

  const mockProducts = [
    {
      id: 1,
      title: "Truffle Ribeye Steak",
      price: 49.0,
      category: "Main Course",
      status: "Active",
    },
    {
      id: 2,
      title: "Lobster Ravioli",
      price: 32.5,
      category: "Main Course",
      status: "Active",
    },
    {
      id: 3,
      title: "Aged Wagyu Burger",
      price: 28.0,
      category: "Main Course",
      status: "Inactive",
    },
    {
      id: 4,
      title: "Smoked Old Fashioned",
      price: 18.0,
      category: "Drinks",
      status: "Active",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await menuService.getAll();
        setProducts(response.data?.length ? response.data : mockProducts);
      } catch {
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: Date.now(),
      status: "Active",
      price: parseFloat(formData.price),
    };
    setProducts([...products, newProduct]);
    setShowModal(false);
    setFormData({
      title: "",
      price: "",
      category: "Main Course",
      description: "",
    });
  };

  const toggleStatus = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p,
      ),
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">
            Menu <span className="text-purple-500">Products</span>
          </h1>
          <p className="text-white/50 text-lg">
            Manage dishes, prices, and availability.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Add Product
        </button>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#050505] border-b border-white/5 text-xs uppercase tracking-wider text-white/40">
                <th className="p-6 font-bold">Product Name</th>
                <th className="p-6 font-bold">Category</th>
                <th className="p-6 font-bold">Price</th>
                <th className="p-6 font-bold">Status</th>
                <th className="p-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-white/30">
                    Loading...
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="p-6 font-bold">{product.title}</td>
                    <td className="p-6 text-white/50">{product.category}</td>
                    <td className="p-6 font-bold text-green-400">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="p-6">
                      <button
                        onClick={() => toggleStatus(product.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${product.status === "Active" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-white/5 text-white/40 border-white/10"}`}
                      >
                        {product.status}
                      </button>
                    </td>
                    <td className="p-6 text-right space-x-3">
                      <button className="text-white/30 hover:text-blue-500 transition-colors">
                        Edit
                      </button>
                      <button className="text-white/30 hover:text-red-500 transition-colors">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-lg shadow-2xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
                  Title
                </label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
                    Price ($)
                  </label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 text-white font-sans"
                  >
                    <option>Main Course</option>
                    <option>Drinks</option>
                    <option>Salad</option>
                    <option>Dessert</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500 text-white h-24 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-purple-500 text-white rounded-xl font-bold hover:bg-purple-600 transition-colors mt-6"
              >
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
