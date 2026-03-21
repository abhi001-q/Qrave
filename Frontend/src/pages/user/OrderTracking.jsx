import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { orderService } from "../../services/orderService";
import { paymentService } from "../../services/paymentService";
import { toast } from "react-toastify";

export default function OrderTracking() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const steps = [
    { label: "Order Placed", status: "pending", icon: "assignment_turned_in" },
    { label: "Preparing", status: "preparing", icon: "skillet" },
    { label: "Out for Delivery", status: "out_for_delivery", icon: "delivery_dining" },
    { label: "Delivered", status: "delivered", icon: "check_circle" },
  ];

  const fetchOrder = async () => {
    try {
      const response = await orderService.getById(id);
      if (response.data) {
        const orderData = response.data;
        setOrder(orderData);

        // eSewa Status Check Fallback
        // If order is pending and uses eSewa, check with eSewa directly
        if (orderData.status === "pending" && orderData.payment_method === "eSewa") {
          const transaction_uuid = `QRV-${orderData.id}`;
          const total_amount = orderData.total_amount || orderData.total;
          
          const statusUrl = `${paymentService.getStatusUrl()}?product_code=${paymentService.getMerchantId()}&total_amount=${total_amount}&transaction_uuid=${transaction_uuid}`;
          
          const esewaRes = await fetch(statusUrl).then(r => r.json());
          if (esewaRes.status === "COMPLETE") {
            await orderService.updateStatus(orderData.id, "PAID");
            toast.success("Payment confirmed via status check!");
            // Refresh order data after update
            const updated = await orderService.getById(id);
            if (updated.data) setOrder(updated.data);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching order status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    // Auto-refresh every 15 seconds for real-time tracking
    const interval = setInterval(fetchOrder, 15000);
    return () => clearInterval(interval);
  }, [id]);

  const getCurrentStepIndex = () => {
    if (!order) return 0;
    const index = steps.findIndex(s => s.status === order.status);
    return index === -1 ? 0 : index;
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Connecting to Kitchen...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-[40px] bg-slate-50 flex items-center justify-center text-slate-200 mb-8 border border-slate-100 shadow-inner">
          <span className="material-symbols-outlined text-5xl">error_outline</span>
        </div>
        <h3 className="text-slate-900 font-black text-2xl mb-2">Order Not Found</h3>
        <p className="text-slate-500 font-bold text-sm max-w-xs mb-8">We couldn't locate the order details for ID: {id}</p>
        <Link to="/orders" className="text-primary font-black text-xs uppercase tracking-widest hover:underline underline-offset-8">Return to History</Link>
      </div>
    );
  }

  const currentStep = getCurrentStepIndex();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <span className="bg-orange-50 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-orange-100">
                Active Tracking
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Updated 30s ago</span>
           </div>
           <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
             Track Order <span className="text-primary italic">#{String(id).slice(-4).toUpperCase()}</span>
           </h1>
        </div>
        <Link 
          to="/orders" 
          className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:shadow-lg transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-lg">history</span>
          View History
        </Link>
      </div>

      {/* Main Status Tracker */}
      <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm p-8 md:p-12 relative overflow-hidden">
        {/* Progress Background Line */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60px] w-[80%] h-1 bg-slate-50 hidden md:block"></div>
        {/* Animated Active Line */}
        <div 
          className="absolute top-1/2 left-[10%] -translate-y-[60px] h-1 bg-primary hidden md:block transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,107,0,0.3)]"
          style={{ width: `${(currentStep / (steps.length - 1)) * 80}%` }}
        ></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;
            const isNext = index === currentStep + 1;

            return (
              <div key={step.status} className="flex flex-col items-center text-center group">
                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-all duration-500 border-4 ${
                  isCompleted 
                    ? 'bg-primary border-orange-100 text-white shadow-xl shadow-primary/20 scale-110' 
                    : 'bg-white border-slate-50 text-slate-200'
                } ${isCurrent ? 'animate-bounce' : ''}`}>
                  <span className={`material-symbols-outlined text-2xl ${isCompleted ? 'text-white' : 'text-slate-200'}`}>
                    {isCompleted ? (isCurrent ? step.icon : 'check_circle') : step.icon}
                  </span>
                </div>
                <div className="mt-6 space-y-1">
                   <p className={`text-xs font-black uppercase tracking-widest transition-colors ${isCompleted ? 'text-slate-900' : 'text-slate-300'}`}>
                     {step.label}
                   </p>
                   {isCurrent && (
                     <p className="text-[10px] font-bold text-primary animate-pulse uppercase tracking-wider">In Progress...</p>
                   )}
                   {!isCompleted && !isCurrent && (
                     <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">Waiting</p>
                   )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Highlight Card */}
        <div className="mt-20 bg-slate-50 border border-slate-100 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-3xl">timer</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Estimated Arrival</p>
                <p className="text-xl font-black text-slate-900 tracking-tight">25 - 35 Minutes</p>
              </div>
           </div>
           <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm">
                <span className="material-symbols-outlined text-3xl">map</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Destination</p>
                <p className="text-xl font-black text-slate-900 tracking-tight truncate max-w-[200px]">
                  {order.table_id ? `Table #${order.table_id}` : 'Delivery Address'}
                </p>
              </div>
           </div>
           <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95">
             Help Center
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-20">
         {/* Order Items */}
         <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm italic">Order Breakdown</h3>
              <span className="text-xs font-bold text-slate-400">Items: {order.total_amount ? '$' + order.total_amount : 'N/A'}</span>
            </div>
            <div className="p-2">
               {/* Note: In a real app we'd fetch items separately or join them. For now simple summary */}
               <div className="p-8 text-center bg-slate-50/50 rounded-[32px] border border-dashed border-slate-100">
                  <span className="material-symbols-outlined text-slate-200 text-4xl mb-4">reorder</span>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                    Refer to your <Link to="/orders" className="text-primary hover:underline">order history</Link><br/>for the full itemized list.
                  </p>
               </div>
            </div>
         </div>

         {/* Additional Info Cards */}
         <div className="space-y-8">
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all">
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">support_agent</span>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm leading-none mb-1">Customer Support</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Connect with a representative</p>
                  </div>
               </div>
               <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all">
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm leading-none mb-1">Digital Bill</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Download official invoice</p>
                  </div>
               </div>
               <span className="material-symbols-outlined text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>
         </div>
      </div>
    </div>
  );
}
