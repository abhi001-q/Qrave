import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { orderService } from "../../services/orderService";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data fallback
  const mockOrders = [
    { id: "ORD-9821A", totalAmount: 42.50, status: "PREPARING", createdAt: new Date(Date.now() - 15 * 60000).toISOString(), itemsCount: 3 },
    { id: "ORD-1038C", totalAmount: 112.00, status: "DELIVERED", createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), itemsCount: 5 },
    { id: "ORD-9912B", totalAmount: 18.25, status: "DELIVERED", createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), itemsCount: 1 },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getAll();
        setOrders(response.data?.length ? response.data : mockOrders);
      } catch {
        setOrders(mockOrders); // Fallback to mock on error
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "PREPARING": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "READY": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "DELIVERED": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "CANCELLED": return "text-red-500 bg-red-500/10 border-red-500/20";
      default: return "text-white/50 bg-white/5 border-white/10";
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">Order <span className="text-orange-500">History</span></h1>
          <p className="text-white/50">Track your current orders and review past purchases.</p>
        </div>
        <Link to="/menu" className="px-6 py-2.5 bg-white/5 rounded-full border border-white/10 hover:bg-white hover:text-black font-bold transition-all text-sm hidden sm:block">
          New Order
        </Link>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-[#111] rounded-2xl border border-white/5"></div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-[#111] border border-white/5 rounded-3xl p-12 text-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-white/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <h3 className="text-xl font-bold mb-2">No Orders Yet</h3>
          <p className="text-white/50 mb-6">Looks like you haven't placed any orders. Start exploring our menu!</p>
          <Link to="/menu" className="inline-block px-8 py-3 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-colors">Browse Menu</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <Link 
              to={`/orders/${order.id}`} 
              key={order.id}
              className="group block bg-[#111] hover:bg-[#151515] border border-white/5 hover:border-orange-500/30 rounded-3xl p-6 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-black/50 border border-white/10 rounded-2xl flex items-center justify-center text-white/70 group-hover:text-orange-500 transition-colors shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-3">
                      Order #{typeof order.id === 'string' ? order.id.slice(-6).toUpperCase() : order.id}
                    </h3>
                    <p className="text-sm text-white/40 mt-1">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })} • {order.itemsCount || order.items?.length || 0} Items
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-1/3">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <div className="text-right flex items-center gap-4">
                    <span className="text-xl font-bold">${parseFloat(order.totalAmount).toFixed(2)}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-orange-500 group-hover:translate-x-1 transition-all"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
