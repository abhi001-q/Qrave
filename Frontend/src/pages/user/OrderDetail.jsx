import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { orderService } from "../../services/orderService";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fallback mock details
  const mockOrder = {
    id: id,
    status: "PREPARING",
    totalAmount: 42.50,
    paymentMethod: "ONLINE",
    createdAt: new Date().toISOString(),
    items: [
      { id: 1, title: "Truffle Ribeye Steak", price: 49.00, quantity: 1, image: "https://images.unsplash.com/photo-1546241072-48010adcb585?ixlib=rb-4.0.3&w=200&q=80" },
      { id: 4, title: "Smoked Old Fashioned", price: 18.00, quantity: 2, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&w=200&q=80" }
    ],
    tableId: 12
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderService.getById(id);
        setOrder(response.data || mockOrder);
      } catch {
        setOrder(mockOrder);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const getStatusTracker = (status) => {
    const steps = ["PENDING", "PREPARING", "READY", "DELIVERED"];
    const currentIndex = steps.indexOf(status) === -1 ? 0 : steps.indexOf(status);
    
    return (
      <div className="relative w-full max-w-3xl mx-auto my-12">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-[#111] -translate-y-1/2 rounded-full"></div>
        <div 
          className="absolute top-1/2 left-0 h-1 bg-orange-500 -translate-y-1/2 rounded-full transition-all duration-1000"
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        ></div>
        
        <div className="relative z-10 flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-500 mb-2 ${
                  isCompleted ? 'bg-orange-500 border-orange-500 text-white' : 'bg-[#111] border-white/10 text-white/30'
                } ${isCurrent ? 'ring-4 ring-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.5)]' : ''}`}>
                  {isCompleted ? <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : index + 1}
                </div>
                <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-orange-500' : isCompleted ? 'text-white/80' : 'text-white/30'}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const handleDownloadInvoice = () => {
    // A placeholder for billService.download(order.id)
    alert("Invoice download functionality will trigger here. Connecting to backend PDF generator.");
  };

  if (loading) return <div className="animate-pulse h-64 bg-[#111] rounded-3xl"></div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <Link to="/orders" className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-bold mb-4 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Back to Orders
          </Link>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter">Order <span className="text-white/40">#{typeof order.id === 'string' ? order.id.slice(-6).toUpperCase() : order.id}</span></h1>
          <p className="text-white/50 mt-2">Placed on {new Date(order.createdAt).toLocaleString()} • Table {order.tableId}</p>
        </div>
        
        <button 
          onClick={handleDownloadInvoice}
          className="px-6 py-3 bg-[#111] border border-white/10 text-white rounded-full font-bold flex items-center gap-2 hover:bg-white hover:text-black transition-all group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 group-hover:text-black transition-colors"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Download Invoice
        </button>
      </div>

      {getStatusTracker(order.status)}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="bg-[#111] rounded-3xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-xl font-bold">Order Items</h3>
            </div>
            <div>
              {order.items.map((item, index) => (
                <div key={item.id || index} className="flex items-center gap-4 p-6 border-b border-white/5 last:border-0 hover:bg-[#151515] transition-colors">
                  <div className="w-16 h-16 rounded-xl bg-black overflow-hidden shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-white/50">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-orange-400">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#111] rounded-3xl border border-white/5 p-6">
            <h3 className="font-bold mb-4">Payment Summary</h3>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {(order.totalAmount / 1.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax & Fees</span>
                <span>Rs. {(order.totalAmount - (order.totalAmount / 1.1)).toFixed(2)}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-white/5 flex justify-between items-center text-white">
                <span className="font-bold text-lg">Total</span>
                <span className="font-black text-2xl text-orange-500">Rs. {parseFloat(order.totalAmount).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#111] rounded-3xl border border-white/5 p-6 space-y-4">
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Payment Method</p>
              <p className="font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> {order.paymentMethod}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Dine Location</p>
              <p className="font-medium">Table {order.tableId}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
