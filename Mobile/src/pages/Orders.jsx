import React, { useState, useEffect } from "react";
import api from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/my-orders")
      .then(res => setOrders(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center text-primary font-black animate-pulse">Loading culinary journey...</div>;

  return (
    <div className="p-6 space-y-10">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-primary shadow-sm">
          <span className="material-symbols-outlined font-black">check_circle</span>
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Order Placed!</h2>
          <p className="text-slate-400 font-medium">Your culinary journey has begun.</p>
        </div>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-orange-50/50 rounded-[3rem] p-8 space-y-8 border-2 border-white shadow-premium animate-slide-up">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-primary font-black text-2xl tracking-tighter">Qrave</h4>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Culinary Curator</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Order ID</p>
                <h4 className="font-black text-slate-800 text-lg">#QR-{order.id.toString().padStart(5, '0')}</h4>
              </div>
            </div>

            <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl border border-white">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Date</p>
                <p className="font-black text-slate-800">{new Date(order.created_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })} • {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <span className="bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                PAID ONLINE
              </span>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-card border border-white space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-slate-500 font-bold text-sm">
                  <span>Subtotal</span>
                  <span>Rs. {order.total_amount}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold text-sm">
                  <span>Delivery Fee</span>
                  <span>Rs. 50</span>
                </div>
                <div className="flex justify-between text-slate-500 font-bold text-sm">
                  <span>Curator Discount</span>
                  <span className="text-orange-500">- Rs. 0</span>
                </div>
                <div className="h-[2px] bg-slate-50 w-full" />
                <div className="flex justify-between items-end pt-2">
                  <div>
                    <h4 className="text-slate-800 font-black text-lg uppercase tracking-tight">Grand Total</h4>
                    <p className="text-[10px] text-slate-400 font-bold">Incl. all taxes</p>
                  </div>
                  <span className="text-primary font-black text-3xl tracking-tighter font-serif">Rs. {order.total_amount}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button className="btn-primary w-full shadow-lg">
                <span className="material-symbols-outlined">download</span>
                Download Bill (PDF)
              </button>
              <button className="btn-ghost w-full">
                <span className="material-symbols-outlined">share</span>
                Share Receipt
              </button>
            </div>

            {/* Delivery Status */}
            <div className="bg-orange-100/50 rounded-[2.5rem] p-6 flex items-center justify-between border border-orange-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined font-black">delivery_dining</span>
                </div>
                <div className="space-y-0.5">
                  <p className="font-black text-slate-800 text-sm">Delivering to Table {order.table_number}</p>
                  <p className="text-[10px] text-slate-400 font-medium">Chef is preparing your magic...</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary">chevron_right</span>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-50 shadow-sm">
            <span className="material-symbols-outlined text-6xl text-orange-100 mb-4 scale-150">receipt_long</span>
            <p className="text-slate-400 font-black uppercase text-xs tracking-widest pt-4">No culinary history yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
