import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { paymentService } from "../services/paymentService";

const Cart = () => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("eSewa");
  const [isPlacing, setIsPlacing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/tables/available").then(res => setTables(res.data.data)).catch(console.error);
  }, []);

  const updateQuantity = (id, delta) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = 50;
  const vat = Math.round(subtotal * 0.13);
  const total = subtotal + deliveryFee + vat;

  const handleCheckout = async () => {
    if (!selectedTable) return alert("Please enter a table number");
    setIsPlacing(true);
    try {
      const res = await api.post("/orders", {
        tableId: selectedTable,
        totalAmount: total.toFixed(2),
        paymentMethod: paymentMethod,
        orderType: "Dine-in",
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      });
      
      const orderId = res.data.data.id;

      // Guest tracking: save orderId to localStorage
      const guestOrders = JSON.parse(localStorage.getItem("guestOrders") || "[]");
      if (!guestOrders.includes(orderId)) {
        guestOrders.push(orderId);
        localStorage.setItem("guestOrders", JSON.stringify(guestOrders));
      }

      if (paymentMethod === "eSewa") {
        const timestamp = Date.now();
        const transaction_uuid = `QRV-${orderId}-${timestamp}`;
        
        console.log("MOBILE: Initiating eSewa with UUID:", transaction_uuid);
        
        // Store UUID in backend
        await api.patch(`/orders/${orderId}/transaction`, { transaction_uuid });

        const amount = subtotal.toFixed(2);
        const tax_amount = vat.toFixed(2);
        const product_delivery_charge = deliveryFee.toFixed(2);
        const total_amount = total.toFixed(2);
        
        const signature = paymentService.generateSignature(total_amount, transaction_uuid);

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = paymentService.getFormUrl();

        const fields = {
          amount,
          tax_amount,
          total_amount,
          transaction_uuid,
          product_code: paymentService.getMerchantId(),
          product_service_charge: 0,
          product_delivery_charge,
          success_url: `${window.location.origin}/payment/success`,
          failure_url: `${window.location.origin}/payment/failure`,
          signed_field_names: "total_amount,transaction_uuid,product_code",
          signature
        };

        for (const key in fields) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = fields[key];
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        return;
      }

      localStorage.removeItem("cart");
      setCartItems([]);
      navigate("/orders");
    } catch (err) {
      alert("Checkout failed: " + (err.response?.data?.message || "Unknown error"));
    } finally {
      setIsPlacing(false);
    }
  };

  const payments = [
    { id: "eSewa", icon: "payments", color: "text-emerald-500", bg: "bg-emerald-50" },
    { id: "Cash", icon: "payments", color: "text-slate-500", bg: "bg-slate-50" },
  ];

  if (cartItems.length === 0) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary shadow-premium">
          <span className="material-symbols-outlined text-5xl">shopping_cart</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">Your cart is empty</h2>
          <p className="text-slate-400 font-medium">Add some delicious dishes to get started!</p>
        </div>
        <Link to="/" className="btn-primary px-12">Start Ordering</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/30 p-6 space-y-10 pb-40">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/" className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm">
          <span className="material-symbols-outlined font-black">arrow_back</span>
        </Link>
        <h2 className="text-2xl font-black text-slate-900">Your Cart <span className="text-[8px] text-slate-300">v2.1</span></h2>
      </div>

      {/* Table Number */}
      <section className="space-y-4">
        <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Dining Table Number</h3>
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary font-bold">table_restaurant</span>
          <input 
            type="number" 
            placeholder="Enter table number (e.g. 12)"
            className="input-field pl-14 shadow-sm"
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
          />
        </div>
        <p className="text-[10px] text-slate-400 font-medium px-2 italic">Providing your table number helps us serve you faster.</p>
      </section>

      {/* Cart Items */}
      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-black text-slate-800">Order Items</h3>
          <span className="text-primary font-black text-xs">{cartItems.length} Items</span>
        </div>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-[2.5rem] p-5 shadow-card border border-white flex gap-5 animate-slide-up">
              <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1480&auto=format&fit=crop"} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <h4 className="font-black text-slate-800 text-base leading-tight">{item.title || item.name}</h4>
                  <button onClick={() => removeItem(item.id)} className="text-red-400">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 font-bold">{item.description || "Standard Preparation"}</p>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-primary font-black text-lg">Rs. {item.price}</span>
                  <div className="flex items-center gap-4 bg-orange-50/50 rounded-xl px-4 py-1.5 border border-orange-100/50">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-primary font-black">
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="text-slate-800 font-black text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-primary font-black">
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Method */}
      <section className="space-y-4">
        <h3 className="text-lg font-black text-slate-800 px-1">Payment Method</h3>
        <div className="grid grid-cols-2 gap-4">
          {payments.map((p) => (
            <button
              key={p.id}
              onClick={() => setPaymentMethod(p.id)}
              className={`h-28 rounded-[2rem] border-2 flex flex-col items-center justify-center gap-3 transition-all ${
                paymentMethod === p.id 
                ? "bg-white border-primary shadow-lg shadow-primary/10" 
                : "bg-white border-slate-50 italic text-slate-400 group hover:border-orange-100"
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl ${p.bg} flex items-center justify-center ${p.color}`}>
                <span className="material-symbols-outlined text-2xl font-bold">{p.icon}</span>
              </div>
              <span className={`text-sm font-black ${paymentMethod === p.id ? "text-slate-800" : "text-slate-400"}`}>{p.id}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Summary */}
      <div className="bg-orange-100/30 rounded-[3rem] p-8 space-y-6 border-2 border-white">
        <h3 className="text-lg font-black text-slate-800">Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-slate-500 font-bold text-sm px-1">
            <span>Subtotal</span>
            <span>Rs. {subtotal}</span>
          </div>
          <div className="flex justify-between text-slate-500 font-bold text-sm px-1">
            <span>Delivery Fee</span>
            <span>Rs. {deliveryFee}</span>
          </div>
          <div className="flex justify-between text-slate-500 font-bold text-sm px-1">
            <span>VAT (13%)</span>
            <span>Rs. {vat}</span>
          </div>
          <div className="h-[2px] bg-white w-full opacity-50 my-4" />
          <div className="flex justify-between items-end px-1 pt-2">
            <span className="text-slate-800 font-black text-xl">Total</span>
            <div className="text-right">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Amount to Pay</p>
              <span className="text-primary font-black text-3xl tracking-tighter">Rs. {total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Button - Positioned ABOVE MobileLayout's nav bar */}
      <div className="fixed bottom-24 left-0 right-0 p-6 bg-white/95 backdrop-blur-md border-t border-slate-100 z-[1001] shadow-2xl">
        <button 
          onClick={handleCheckout}
          disabled={isPlacing}
          className="btn-primary w-full shadow-2xl relative overflow-hidden group"
        >
          {isPlacing ? "Processing..." : "Confirm Order / Pay Now"}
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
