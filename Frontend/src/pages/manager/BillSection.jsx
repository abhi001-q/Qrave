import React, { useState } from "react";

export default function BillSection() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock data representing Delivered orders ready for billing
  const readyOrders = [
    { id: "1035E", table: 1, total: 112.00, items: 5, time: "45 min ago" },
    { id: "1032B", table: 6, total: 42.50, items: 2, time: "1 hr ago" },
    { id: "1028X", table: 9, total: 88.00, items: 4, time: "2 hrs ago" },
  ];

  const mockOrderDetails = {
    id: "1035E",
    table: 1,
    date: new Date().toLocaleString(),
    cashier: "Manager Admin",
    subtotal: 101.82,
    tax: 10.18,
    total: 112.00,
    items: [
      { name: "Truffle Ribeye Steak", qty: 1, price: 49.00 },
      { name: "Lobster Ravioli", qty: 1, price: 32.50 },
      { name: "Smoked Old Fashioned", qty: 1, price: 18.00 },
      { name: "Sparkling Water", qty: 2, price: 2.32 },
    ]
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8">
      {/* List of Orders Ready for Billing */}
      <div className="w-full lg:w-1/3 flex flex-col">
        <div className="mb-8">
           <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2"><span className="text-purple-500">Billing</span></h1>
           <p className="text-white/50 text-lg">Finalize orders and print receipts.</p>
        </div>

        <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden flex-1 flex flex-col">
          <div className="p-6 border-b border-white/5 bg-[#050505]">
            <h2 className="font-bold text-lg">Orders to Bill</h2>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            {readyOrders.map(order => (
              <div 
                key={order.id} 
                onClick={() => setSelectedOrder(order.id === selectedOrder ? null : order.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${selectedOrder === order.id ? 'bg-purple-500/10 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]' : 'bg-[#151515] border-white/5 hover:border-white/20'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-lg">#{order.id}</h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-white/40">Table {order.table}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/50">{order.items} Items</span>
                  <span className={`font-bold ${selectedOrder === order.id ? 'text-purple-400' : 'text-white'}`}>${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
            {readyOrders.length === 0 && (
              <div className="p-8 text-center text-white/30 font-bold">No orders ready for billing.</div>
            )}
          </div>
        </div>
      </div>

      {/* Bill Preview Pane */}
      <div className="w-full lg:w-2/3 flex flex-col bg-[#111] border border-white/5 rounded-3xl overflow-hidden min-h-[600px] relative">
        {!selectedOrder ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-6 border-2 border-dashed border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-white/50 mb-2">No Order Selected</h3>
            <p className="text-white/30 max-w-sm">Select an order from the list to preview and generate the final bill.</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full bg-white rounded-3xl m-4 text-black overflow-hidden relative print:m-0 print:rounded-none">
            {/* Bill Header */}
            <div className="p-8 border-b-2 border-black/10 text-center relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl print:hidden"></div>
              <h2 className="text-3xl font-black tracking-tighter uppercase">Qrave</h2>
              <p className="text-black/50 text-sm mt-1 uppercase tracking-widest font-bold">Premium Dining</p>
              <div className="mt-6 flex justify-between text-sm text-left">
                <div>
                  <p className="text-black/50 font-bold uppercase text-[10px]">Order ID</p>
                  <p className="font-bold">#{mockOrderDetails.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-black/50 font-bold uppercase text-[10px]">Table</p>
                  <p className="font-bold">{mockOrderDetails.table}</p>
                </div>
              </div>
            </div>

            {/* Bill Items */}
            <div className="p-8 flex-1 overflow-y-auto">
              <div className="flex border-b-2 border-black/10 pb-2 mb-4 text-[10px] uppercase font-black tracking-widest text-black/40">
                <div className="flex-1">Item</div>
                <div className="w-16 text-center">Qty</div>
                <div className="w-24 text-right">Price</div>
              </div>
              
              <div className="space-y-4">
                {mockOrderDetails.items.map((item, idx) => (
                  <div key={idx} className="flex font-semibold">
                    <div className="flex-1">{item.name}</div>
                    <div className="w-16 text-center text-black/60">{item.qty}</div>
                    <div className="w-24 text-right">${(item.price * item.qty).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bill Footer Totals */}
            <div className="p-8 bg-black/5">
              <div className="space-y-2 text-sm font-semibold text-black/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${mockOrderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${mockOrderDetails.tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t-2 border-black/10 flex justify-between items-end">
                <span className="font-bold uppercase tracking-widest text-sm">Amount Due</span>
                <span className="text-3xl font-black">${mockOrderDetails.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions (Hidden on Print) */}
            <div className="absolute inset-0 pointer-events-none print:hidden flex flex-col justify-end">
              <div className="p-4 bg-gradient-to-t from-black/20 to-transparent pointer-events-auto flex justify-end gap-3">
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="px-6 py-3 bg-white text-black border-2 border-black/10 rounded-xl font-bold hover:bg-black/5 transition-colors shadow-lg"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePrint}
                  className="px-6 py-3 bg-purple-500 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-purple-600 transition-colors shadow-[0_10px_30px_rgba(168,85,247,0.3)]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                  Print Bill
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
