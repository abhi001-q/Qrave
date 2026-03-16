import React, { useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([
    { id: "1038A", table: 4, status: "PENDING", items: 3, total: 45.00, time: "2 min ago" },
    { id: "1038B", table: 12, status: "PENDING", items: 1, total: 18.00, time: "5 min ago" },
    { id: "1037C", table: 2, status: "PREPARING", items: 4, total: 84.50, time: "12 min ago" },
    { id: "1036D", table: 8, status: "READY", items: 2, total: 32.00, time: "18 min ago" },
    { id: "1035E", table: 1, status: "DELIVERED", items: 5, total: 112.00, time: "45 min ago" },
  ]);

  const columns = [
    { id: "PENDING", title: "New Orders", color: "border-red-500/50", bg: "bg-red-500/5", text: "text-red-500" },
    { id: "PREPARING", title: "Kitchen", color: "border-blue-500/50", bg: "bg-blue-500/5", text: "text-blue-500" },
    { id: "READY", title: "Ready", color: "border-orange-500/50", bg: "bg-orange-500/5", text: "text-orange-500" },
    { id: "DELIVERED", title: "Served", color: "border-green-500/50", bg: "bg-green-500/5", text: "text-green-500" }
  ];

  const moveOrder = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const nextStatus = (current) => {
    const sequence = ["PENDING", "PREPARING", "READY", "DELIVERED"];
    const idx = sequence.indexOf(current);
    return idx < sequence.length - 1 ? sequence[idx + 1] : current;
  };

  return (
    <div className="w-full h-[calc(100vh-140px)] flex flex-col">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 flex-shrink-0">
        <div>
           <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">Live <span className="text-purple-500">Orders</span></h1>
           <p className="text-white/50 text-lg">Real-time kitchen and service dispatch board.</p>
        </div>
        <div className="flex items-center gap-4 bg-[#111] border border-white/5 px-4 py-2 rounded-xl">
           <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Active Orders</span>
           <span className="text-xl font-black text-purple-500">{orders.filter(o => o.status !== "DELIVERED").length}</span>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar pb-4 flex gap-6 snap-x">
        {columns.map(col => {
          const columnOrders = orders.filter(o => o.status === col.id);
          
          return (
            <div key={col.id} className="w-full min-w-[300px] max-w-[350px] flex-shrink-0 flex flex-col snap-start">
              <div className={`flex items-center justify-between p-4 rounded-t-2xl border-t border-x border-white/5 ${col.bg}`}>
                <h3 className={`font-bold text-sm uppercase tracking-wider ${col.text}`}>{col.title}</h3>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${col.bg} ${col.text} border ${col.color}`}>
                  {columnOrders.length}
                </span>
              </div>
              
              <div className="flex-1 bg-[#111]/50 border-x border-b border-white/5 rounded-b-2xl p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                {columnOrders.map(order => (
                  <div key={order.id} className="bg-[#151515] border border-white/5 hover:border-white/20 p-5 rounded-2xl shadow-lg group transition-all">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                         <h4 className="font-black text-lg">#{order.id}</h4>
                         <p className="text-xs text-white/40 uppercase tracking-widest font-bold mt-1">Table {order.table}</p>
                       </div>
                       <span className="text-xs text-white/30">{order.time}</span>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm font-bold text-white/70">{order.items} Items</p>
                        <p className="text-purple-400 font-bold">${order.total.toFixed(2)}</p>
                      </div>
                      
                      {col.id !== "DELIVERED" && (
                        <button 
                          onClick={() => moveOrder(order.id, nextStatus(order.status))}
                          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${col.bg} ${col.text} hover:scale-105`}
                        >
                          Next
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                {columnOrders.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-white/20 border-2 border-dashed border-white/5 rounded-xl p-8">
                     <p className="text-sm font-bold">No orders</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
