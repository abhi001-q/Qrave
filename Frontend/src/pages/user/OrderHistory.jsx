import React from "react";
import { Link } from "react-router-dom";

export default function OrderHistory() {
  // Dummy data for visual representation
  const orders = [
    { id: "ORD-1284", date: "2024-03-15", amount: 154.50, items: 3, status: "Delivered", color: "bg-green-100 text-green-700", trackId: "1284" },
    { id: "ORD-1283", date: "2024-03-14", amount: 22.00, items: 1, status: "Delivered", color: "bg-green-100 text-green-700", trackId: "1283" },
    { id: "ORD-1282", date: "2024-03-12", amount: 89.25, items: 5, status: "Cancelled", color: "bg-red-100 text-red-700", trackId: "1282" },
    { id: "ORD-1281", date: "2024-03-10", amount: 45.00, items: 2, status: "Preparing", color: "bg-orange-100 text-orange-600", trackId: "1281" },
  ];

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
              {orders.map((order) => (
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
                    <span className="font-black text-slate-900">${order.amount.toFixed(2)}</span>
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
                      <button className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-primary transition-all shadow-md shadow-slate-200">
                         <span className="material-symbols-outlined text-xl">autorenew</span>
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
