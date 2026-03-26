import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { orderService } from "../../services/orderService";

export default function BillSection() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);
  const printRef = useRef();

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Polling for new ready orders
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const allOrders = await orderService.getAllAsManager();
      // Filter for orders that are READY for billing
      const ready = (allOrders || []).filter(o => o.status === "READY");
      setOrders(ready);
    } catch (err) {
      console.error("Failed to fetch billing orders", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (id) => {
    try {
      const response = await orderService.getById(id);
      setOrderDetails(response.data);
      setSelectedOrder(id);
      setIsPaid(false);
    } catch (err) {
      toast.error("Failed to load order details");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleMarkPaid = async () => {
    if (!selectedOrder) return;
    try {
      await orderService.updateStatus(selectedOrder, "DELIVERED");
      setIsPaid(true);
      toast.success("Order marked as PAID and Settled");
      fetchOrders(); // Refresh list
    } catch (err) {
      toast.error("Failed to mark as paid");
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toString().includes(searchTerm) || 
    (o.table && o.table.toString().includes(searchTerm))
  );

  const calculateSubtotal = () => {
    if (!orderDetails?.items) return 0;
    return orderDetails.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-10 animate-in fade-in duration-700">
      {/* List of Orders Ready for Billing (Hidden on Print) */}
      <div className="w-full lg:w-1/3 flex flex-col print:hidden">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Billing <span className="text-purple-600">Terminal</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Finalize and settle active table orders.</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden flex-1 flex flex-col min-h-[500px]">
          <div className="p-8 border-b border-slate-50 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-black text-slate-900 uppercase tracking-widest text-xs">Ready for Settle</h2>
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-black">{filteredOrders.length}</span>
            </div>
            
            {/* Search Bar */}
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors text-xl">search</span>
              <input 
                type="text"
                placeholder="Search by Order ID or Table..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-purple-600/20 focus:border-purple-600/30 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
            {loading ? (
               <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-8 h-8 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin"></div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading orders...</p>
               </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-20 text-slate-400 font-bold text-sm">No match found.</div>
            ) : (
              filteredOrders.map(order => (
                <div 
                  key={order.id} 
                  onClick={() => fetchOrderDetails(order.id)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden ${
                    selectedOrder === order.id 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-200' 
                      : 'bg-white border-slate-100 text-slate-900 hover:border-purple-200 hover:bg-purple-50/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`font-black text-xl tracking-tight transition-colors ${selectedOrder === order.id ? 'text-white' : 'text-slate-900'}`}>#{order.id}</h3>
                    <div className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      selectedOrder === order.id ? 'bg-white/20 text-white' : 'bg-slate-50 text-slate-400'
                    }`}>
                      Table {order.table}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className={`text-xs font-bold uppercase tracking-widest ${selectedOrder === order.id ? 'text-white/60' : 'text-slate-400'}`}>{order.items} Items</span>
                        <span className={`text-[10px] font-medium mt-1 ${selectedOrder === order.id ? 'text-white/40' : 'text-slate-300'}`}>{order.time}</span>
                    </div>
                    <span className={`text-xl font-black ${selectedOrder === order.id ? 'text-white' : 'text-purple-600'}`}>Rs. {Number(order.total).toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bill Preview Pane */}
      <div className={`w-full lg:w-2/3 flex flex-col min-h-[600px] relative transition-all duration-500 ${!orderDetails ? 'bg-slate-50/50 border-2 border-dashed border-slate-100' : 'bg-white border border-slate-100'} rounded-[48px] overflow-hidden group print:border-none print:m-0`}>
        
        {/* Print Styles omitted for brevity, keeping them as they were in the original file */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            html, body { margin: 0 !important; padding: 0 !important; height: auto !important; overflow: visible !important; background: white !important; }
            #root, .App, main { margin: 0 !important; padding: 0 !important; height: auto !important; overflow: visible !important; display: block !important; }
            aside, header, nav, footer, .print\\:hidden, [role="button"], button { display: none !important; }
            .bill-print-container { display: block !important; position: static !important; width: 100% !important; max-width: 500px !important; margin: 0 auto !important; padding: 40px 20px !important; background: white !important; border: none !important; box-shadow: none !important; }
            .action-bar-floating { display: none !important; }
            .custom-scrollbar { overflow: visible !important; }
          }
        `}} />

        {!orderDetails ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-20 print:hidden">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-slate-200 mb-8 border-2 border-dashed border-slate-200 group-hover:scale-110 transition-transform duration-500">
               <span className="material-symbols-outlined text-5xl">receipt_long</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Checkout Logic</h3>
            <p className="text-slate-400 max-w-sm font-medium">Select an active order from the terminal on the left to generate the finalized receipt.</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full relative bill-print-container">
            <div className="flex-1 p-12 lg:p-16 flex flex-col max-w-2xl mx-auto w-full">
               <div className="text-center mb-10 relative">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="bg-slate-900 p-2.5 rounded-2xl shadow-xl shadow-slate-200">
                      <span className="material-symbols-outlined text-white text-2xl">restaurant</span>
                    </div>
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">Qrave</span>
                  </div>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Premium Dining Experience</p>
                  
                  <div className="mt-8 flex justify-between items-end border-b-2 border-dashed border-slate-100 pb-6">
                     <div className="text-left">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Receipt Number</p>
                        <p className="text-base font-black text-slate-900 tracking-tight">#{orderDetails.id}</p>
                     </div>
                     <div className="text-center">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Table</p>
                        <p className="text-base font-black text-slate-900 tracking-tight">{orderDetails.table_number || orderDetails.table_id}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Date & Time</p>
                        <p className="text-xs font-bold text-slate-900 italic">{new Date(orderDetails.created_at).toLocaleDateString()} • {new Date(orderDetails.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                     </div>
                  </div>
               </div>

               <div className="flex-1 mb-8">
                  <div className="flex mb-4 text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50 pb-2">
                     <span className="flex-1">Description</span>
                     <span className="w-16 text-center">Qty</span>
                     <span className="w-24 text-right">Amount</span>
                  </div>

                  <div className="space-y-4">
                     {(orderDetails.items || []).map((item, idx) => (
                       <div key={idx} className="flex items-center">
                          <div className="flex-1 min-w-0">
                             <h4 className="font-bold text-slate-900 tracking-tight truncate">{item.name || item.title}</h4>
                             <p className="text-[10px] font-medium text-slate-400">Rs. {Number(item.price).toFixed(2)} / unit</p>
                          </div>
                          <span className="w-16 text-center font-black text-slate-900">x{item.quantity}</span>
                          <span className="w-24 text-right font-black text-slate-900 tracking-tight">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                       </div>
                     ))}
                  </div>

                  <div className="mt-8 pt-8 border-t-2 border-dashed border-slate-100 flex flex-col items-end gap-2 font-sans">
                     <div className="flex justify-between w-64 text-slate-400 font-bold">
                        <span className="text-[10px] uppercase tracking-widest">Subtotal</span>
                        <span className="text-sm tracking-tight text-slate-600">Rs. {calculateSubtotal().toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between w-64 text-slate-400 font-bold">
                        <span className="text-[10px] uppercase tracking-widest">Service Tax (10%)</span>
                        <span className="text-sm tracking-tight text-slate-600">Rs. {(calculateSubtotal() * 0.1).toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between w-64 mt-2 pt-4 border-t border-slate-50 items-end">
                        <span className="text-xs font-black text-slate-900 uppercase tracking-widest mb-0.5">Grand Total</span>
                        <span className="text-3xl font-black text-slate-900 tracking-tighter leading-none">Rs. {(calculateSubtotal() * 1.1).toFixed(2)}</span>
                     </div>
                  </div>
               </div>

               <div className="text-center mt-auto pt-10 border-t border-slate-50 space-y-4">
                  <p className="text-[10px] font-black italic text-slate-300 tracking-widest uppercase">Gratuity not included. Thank you for your visit!</p>
                  <div className="flex justify-center gap-2">
                     <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center grayscale opacity-30">
                        <span className="material-symbols-outlined text-sm">contactless</span>
                     </div>
                     <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center grayscale opacity-30">
                        <span className="material-symbols-outlined text-sm">qr_code_2</span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex ml-60 items-center gap-4 px-8 py-6 bg-white/80 backdrop-blur-xl border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.1)] rounded-[32px] print:hidden z-10 transition-all hover:shadow-2xl hover:-translate-y-1 action-bar-floating">
               <button 
                onClick={() => { setSelectedOrder(null); setOrderDetails(null); }}
                className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center justify-center"
                title="Cancel"
               >
                 <span className="material-symbols-outlined">close</span>
               </button>
               
               <div className="w-px h-8 bg-slate-100 mx-2"></div>

               <button 
                onClick={handlePrint}
                className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
               >
                 <span className="material-symbols-outlined text-xl">print</span>
                 Print Receipt
               </button>

               {(!isPaid && orderDetails.status !== 'DELIVERED' && orderDetails.status !== 'PAID') && (
                 <button 
                  onClick={handleMarkPaid}
                  className="flex items-center gap-3 px-8 py-4 bg-green-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-green-200"
                 >
                   <span className="material-symbols-outlined text-xl">verified_user</span>
                   Mark Paid
                 </button>
               )}
               
               {(isPaid || orderDetails.status === 'DELIVERED' || orderDetails.status === 'PAID') && (
                 <div className="flex items-center gap-2 px-8 py-4 bg-green-50 text-green-600 rounded-2xl font-black text-sm uppercase tracking-widest border border-green-100">
                    <span className="material-symbols-outlined">check_circle</span>
                    PAID
                 </div>
               )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
