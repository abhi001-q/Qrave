import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { orderService } from "../../services/orderService";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderService.getAll();
        
        // Map backend orders to UI format
        const formattedOrders = data.map(order => {
           let statusColor = "bg-orange-100 text-orange-600"; // default Prep/Pending
           if (order.status === "Delivered" || order.status === "Paid") {
              statusColor = "bg-green-100 text-green-700";
           } else if (order.status === "Cancelled" || order.status === "Failed") {
              statusColor = "bg-red-100 text-red-700";
           }
           
           return {
             id: `ORD-${order.id}`,
             trackId: order.id,
             date: new Date(order.created_at).toLocaleDateString(),
             amount: order.total_amount,
             items: order.items?.length || 0,
             status: order.status,
             color: statusColor
           };
        });
        
        setOrders(formattedOrders);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  if (loading) {
     return (
       <div className="w-full h-[50vh] flex items-center justify-center">
         <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
       </div>
     );
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Order History</h1>
            <p className="text-slate-500 font-medium">Track and repeat your favorite meals effortlessly.</p>
         </div>
         <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-2xl transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            <span>Filter</span>
         </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden p-4 md:p-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="pb-6 pt-2 pl-4 text-xs font-black uppercase tracking-widest text-slate-400">Order ID</th>
                <th className="pb-6 pt-2 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Date</th>
                <th className="pb-6 pt-2 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Items</th>
                <th className="pb-6 pt-2 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Total Amount</th>
                <th className="pb-6 pt-2 text-xs font-black uppercase tracking-widest text-slate-400 text-center">Status</th>
                <th className="pb-6 pt-2 pr-4 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-20 text-center text-slate-400 font-bold">You have no order history yet.</td>
                </tr>
              ) : orders.map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-6 pl-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-50 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">receipt</span>
                      </div>
                      <span className="font-bold text-slate-900">{order.id}</span>
                    </div>
                  </td>
                  <td className="py-6 text-center">
                    <span className="font-bold text-slate-600 text-sm">{order.date}</span>
                  </td>
                  <td className="py-6 text-center font-bold text-slate-600 text-sm">
                    {order.items} items
                  </td>
                  <td className="py-6 text-center">
                    <span className="font-black text-slate-900">Rs. {Number(order.amount).toFixed(2)}</span>
                  </td>
                  <td className="py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${order.color}`}>
                      {order.status}
                    </span>
                  </td>
                   <td className="py-6 pr-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/orders/track/${order.trackId}`} title="Track Order" className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm">
                         <span className="material-symbols-outlined text-xl">monitoring</span>
                      </Link>
                      <button title="View Detail" className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm">
                         <span className="material-symbols-outlined text-xl">visibility</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Dummy */}
        <div className="mt-10 flex items-center justify-between pb-4 px-4">
          <p className="text-xs font-bold text-slate-400">Showing 4 of 24 orders</p>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <button key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-all ${i === 1 ? 'bg-primary text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900'}`}>{i}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
