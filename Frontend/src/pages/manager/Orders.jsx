import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { orderService } from "../../services/orderService";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAllAsManager();
        setOrders(response || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load live orders");
      }
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const columns = [
    { id: "PENDING", title: "New Orders", color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
    { id: "PREPARING", title: "Kitchen", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { id: "READY", title: "Ready", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
    { id: "OUT_FOR_DELIVERY", title: "On Way", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
    { id: "DELIVERED", title: "Settled", color: "text-green-600", bg: "bg-green-50", border: "border-green-100" }
  ];

  const moveOrder = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      toast.info(`Order #${orderId} moved to ${newStatus.replace(/_/g, ' ')}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const getNextStatus = (order) => {
    if (order.type?.toLowerCase().includes("dine")) {
      const sequence = ["PENDING", "PREPARING", "READY", "DELIVERED"];
      const idx = sequence.indexOf(order.status);
      return sequence[idx + 1] || order.status;
    } else {
      const sequence = ["PENDING", "PREPARING", "READY", "OUT_FOR_DELIVERY", "DELIVERED"];
      const idx = sequence.indexOf(order.status);
      return sequence[idx + 1] || order.status;
    }
  };

  const getActionButtonLabel = (order) => {
    if (order.status === "READY") {
      return order.type === "Delivery" ? "Hand over to Rider" : "Server Served";
    }
    if (order.status === "OUT_FOR_DELIVERY") return "Simulate Customer Receipt";
    if (order.status === "PENDING") return "Accept & Prep";
    if (order.status === "PREPARING") return "Mark Ready";
    return "Next";
  };

  return (
    <div className="w-full h-[calc(100vh-140px)] flex flex-col animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 flex-shrink-0">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Live <span className="text-purple-600">Operations</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Real-time hub for kitchen prep and active delivery dispatching.</p>
        </div>
        <div className="flex items-center gap-4 bg-white border border-slate-100 px-6 py-4 rounded-[28px] shadow-sm">
          <div className="flex items-center gap-2 pr-4 border-r border-slate-100">
             <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse outline outline-4 outline-red-100"></span>
             <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Orders</span>
          </div>
          <span className="text-2xl font-black text-purple-600 tabular-nums">
            {orders.filter(o => o.status !== "DELIVERED").length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto custom-scrollbar-h pb-8 flex gap-8 snap-x p-1">
        {columns.map(col => {
          const columnOrders = orders.filter(o => o.status === col.id);
          
          return (
            <div key={col.id} className="w-[340px] flex-shrink-0 flex flex-col snap-start">
              <div className={`flex items-center justify-between px-6 py-4 rounded-3xl mb-6 border ${col.border} ${col.bg} shadow-sm shadow-slate-50 transition-all hover:scale-[1.02]`}>
                <h3 className={`font-black text-[10px] uppercase tracking-widest ${col.color}`}>{col.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-black ${col.bg} ${col.color} border ${col.border}`}>
                  {columnOrders.length}
                </span>
              </div>
              
              <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar px-1 pb-4">
                {columnOrders.map(order => (
                  <div key={order.id} className="bg-white border border-slate-100 hover:border-purple-200 p-6 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col relative overflow-hidden">
                    
                    {/* Background indicator for type */}
                    <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-5 -mr-12 -mt-12 transition-opacity group-hover:opacity-20 ${order.type === 'Delivery' ? 'bg-green-600' : 'bg-purple-600'}`}></div>

                    <div className="flex justify-between items-start mb-5 relative z-10">
                       <div>
                         <div className="flex items-center gap-2 mb-1">
                           <h4 className="font-black text-xl text-slate-900 tracking-tight">#{order.id}</h4>
                           <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${order.type === 'Delivery' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                             {order.type}
                           </span>
                         </div>
                         <div className="flex items-center gap-1.5 min-h-[14px]">
                            {order.status === 'READY' && order.type === 'Delivery' && (
                              <div className="flex items-center gap-1">
                                 <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                                 <p className="text-[10px] text-orange-500 uppercase tracking-widest font-black">Awaiting Rider</p>
                              </div>
                            )}
                            {order.status === 'OUT_FOR_DELIVERY' && (
                              <div className="flex items-center gap-1">
                                 <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></span>
                                 <p className="text-[10px] text-purple-600 uppercase tracking-widest font-black">Tracking Live</p>
                              </div>
                            )}
                            {(order.status !== 'READY' || !order.type?.toLowerCase().includes("delivery")) && order.status !== 'OUT_FOR_DELIVERY' && (
                              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
                                {order.type?.toLowerCase().includes("dine") ? `Table ${order.table}` : "Home Delivery"}
                              </p>
                            )}
                         </div>
                       </div>
                       <span className="text-[10px] font-black text-slate-300 bg-slate-50 px-2 py-1 rounded-lg">{order.time}</span>
                    </div>

                    {order.type === "Delivery" && order.customer && (
                       <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:border-green-100 transition-all">
                          <div className="flex items-start gap-3 mb-2">
                             <span className="material-symbols-outlined text-green-600 text-sm mt-0.5">person</span>
                             <span className="text-xs font-black text-slate-700">{order.customer.name}</span>
                          </div>
                          <div className="flex items-start gap-3 mb-1">
                             <span className="material-symbols-outlined text-slate-400 text-sm mt-0.5">location_on</span>
                             <span className="text-[10px] font-bold text-slate-500 leading-tight">{order.customer.address}</span>
                          </div>
                          <div className="flex items-start gap-3">
                             <span className="material-symbols-outlined text-blue-500 text-sm mt-0.5">call</span>
                             <span className="text-[10px] font-black text-slate-600">{order.customer.phone}</span>
                          </div>
                       </div>
                    )}
                    
                    <div className="flex justify-between items-end mt-auto pt-4 border-t border-slate-50 relative z-10">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{order.items} Items</p>
                        <p className="text-2xl font-black text-slate-900 tracking-tighter">Rs. {Number(order.total).toFixed(2)}</p>
                      </div>
                      
                      {col.id !== "DELIVERED" && (
                        <button 
                          onClick={() => moveOrder(order.id, getNextStatus(order))}
                          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${col.bg} ${col.color} border ${col.border} hover:shadow-lg active:scale-95 group/btn`}
                        >
                          {getActionButtonLabel(order)}
                          <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">arrow_forward</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                
                {columnOrders.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-200 border-2 border-dashed border-slate-50 rounded-[40px] p-12 group hover:border-slate-100 transition-all">
                     <span className="material-symbols-outlined text-4xl mb-4 opacity-50 transition-transform group-hover:scale-110">inbox</span>
                     <p className="text-[10px] font-black uppercase tracking-widest">No orders</p>
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
