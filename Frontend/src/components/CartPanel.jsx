import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { toast } from "react-toastify";
import { paymentService } from "../services/paymentService";
import { orderService } from "../services/orderService";

export default function CartPanel() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();
  const [orderType, setOrderType] = useState("Dine In"); // Dine In / Delivery
  const [paymentMethod, setPaymentMethod] = useState("Cash"); // Cash / eSewa
  const [tableNo, setTableNo] = useState("");
  const [deliveryDetails, setDeliveryDetails] = useState({
    location: "",
    zipCode: "",
  });

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (orderType === "Dine In" && !tableNo) {
      toast.warn("Please enter your Table Number.");
      return;
    }

    if (
      orderType === "Delivery" &&
      (!deliveryDetails.location || !deliveryDetails.zipCode)
    ) {
      toast.warn("Please provide delivery details.");
      return;
    }

    try {
      // 1. Create order in backend first
      const orderData = {
        // Map items to backend model (productId, quantity, price)
        items: items.map(i => ({ 
          productId: i.id, 
          quantity: i.quantity,
          price: i.price 
        })),
        orderType,
        paymentMethod,
        // Backend expects 'tableId' (numeric) and 'totalAmount'
        tableId: orderType === "Dine In" ? parseInt(tableNo.replace("T-", "")) : null,
        totalAmount: (total * 1.13).toFixed(2),
        delivery_location: deliveryDetails.location,
        delivery_zip: deliveryDetails.zipCode
      };

      const { id: orderId } = await orderService.create(orderData);
      
      // 2. Handle eSewa Redirection
      if (paymentMethod === "eSewa") {
        const transaction_uuid = `QRV-${orderId}-${Date.now()}`;
        
        // Store the transaction_uuid in backend
        await orderService.updateTransactionId(orderId, transaction_uuid);
        
        // eSewa v2 requires: total_amount = amount + tax_amount + service_charge + delivery_charge
        const amount = total.toFixed(2);
        const tax_amount = (total * 0.13).toFixed(2);
        const total_amount = (parseFloat(amount) + parseFloat(tax_amount)).toFixed(2);
        
        const signature = paymentService.generateSignature(total_amount, transaction_uuid);

        // Create a hidden form and submit it
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = paymentService.getFormUrl();

        const fields = {
          amount: amount,
          tax_amount: tax_amount,
          total_amount: total_amount,
          transaction_uuid: transaction_uuid,
          product_code: paymentService.getMerchantId(),
          product_service_charge: 0,
          product_delivery_charge: 0,
          success_url: `${window.location.origin}/payment/success`,
          failure_url: `${window.location.origin}/payment/failure`,
          signed_field_names: "total_amount,transaction_uuid,product_code",
          signature: signature
        };

        for (const key in fields) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = fields[key];
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        return; // Transition occurs here
      }

      // 3. Handle Cash Payment (Mock success)
      toast.success(`Order Placed: ${orderType} via ${paymentMethod}`);
      clearCart();
    } catch (error) {
      console.error("Checkout failed Detail:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
    }
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* 1. Fixed Header (Title) */}
      <div className="p-8 pb-4 pt-10 border-b border-slate-50 flex-shrink-0">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none italic uppercase">
            Order <span className="text-primary not-italic">Summary</span>
          </h2>
          <span className="bg-orange-50 text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-orange-100 shadow-sm">
            {items.reduce((acc, item) => acc + item.qty || item.quantity, 0)} Items
          </span>
        </div>
      </div>

      {/* 2. Scrollable Body (Toggle + Form + Items + Totals) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-6 space-y-10 min-h-0">
        {/* Toggle */}
        <section>
          <div className="bg-slate-50 p-1 rounded-2xl flex items-center border border-slate-100">
            <button
              onClick={() => setOrderType("Dine In")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                orderType === "Dine In"
                  ? "bg-white text-primary shadow-sm border border-slate-100"
                  : "text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined text-base">restaurant</span>
              Dine In
            </button>
            <button
              onClick={() => setOrderType("Delivery")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                orderType === "Delivery"
                  ? "bg-white text-primary shadow-sm border border-slate-100"
                  : "text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined text-base">delivery_dining</span>
              Delivery
            </button>
          </div>
        </section>

        {/* Forms */}
        <section>
          {orderType === "Dine In" ? (
            <div className="p-4 bg-orange-50/30 rounded-2xl border border-orange-100/50">
              <label className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 block">Table Number</label>
              <input
                type="text"
                placeholder="Enter Table No"
                className="w-full bg-white border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold"
                value={tableNo}
                onChange={(e) => setTableNo(e.target.value)}
              />
            </div>
          ) : (
            <div className="p-4 bg-orange-50/30 rounded-2xl border border-orange-100/50 space-y-3">
              <div>
                <label className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 block">Address</label>
                <input
                  type="text"
                  placeholder="Delivery location"
                  className="w-full bg-white border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold"
                  value={deliveryDetails.location}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, location: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-primary uppercase tracking-widest mb-1 block">Zip / Postal Code</label>
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="w-full bg-white border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold"
                  value={deliveryDetails.zipCode}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, zipCode: e.target.value })}
                />
              </div>
            </div>
          )}
        </section>

        {/* Items List */}
        <section className="space-y-6">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Order Items</h3>
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-xl bg-slate-50 overflow-hidden border border-slate-100">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-black text-slate-800 line-clamp-1">{item.title}</h4>
                <p className="text-[10px] font-bold text-primary">Rs. {Number(item.price).toFixed(2)}</p>
              </div>
              <div className="flex items-center bg-slate-50 rounded-lg p-1">
                <button onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))} className="w-6 h-6 flex items-center justify-center font-bold text-slate-400 hover:text-primary">-</button>
                <span className="w-5 text-center text-[11px] font-black">{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 flex items-center justify-center font-bold text-slate-400 hover:text-primary">+</button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-10 opacity-30 italic text-sm">Empty</div>
          )}
        </section>

        {/* Totals */}
        <div className="pt-8 border-t border-slate-100 space-y-4">
          <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>Payment</span>
            <div className="flex gap-2">
              <button onClick={() => setPaymentMethod("Cash")} className={`px-2 py-1 rounded-lg border ${paymentMethod === "Cash" ? "bg-white text-slate-800 border-slate-200" : "text-slate-300 border-transparent"}`}>Cash</button>
              <button onClick={() => setPaymentMethod("eSewa")} className={`px-2 py-1 rounded-lg border ${paymentMethod === "eSewa" ? "bg-[#60bb46] text-white border-[#60bb46]" : "text-slate-300 border-transparent"}`}>eSewa</button>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 font-bold">
            <span>Subtotal</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-500 font-bold">
            <span>Tax (13%)</span>
            <span>Rs. {(total * 0.13).toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-end pt-4">
            <span className="text-slate-800 font-black text-sm uppercase tracking-widest">Total Pay</span>
            <span className="text-primary font-black text-3xl tracking-tighter">Rs. {(total * 1.13).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* 3. Sticky Bottom Button */}
      <div className="p-6 bg-white border-t border-slate-50 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-10">
        <button
          onClick={handleCheckout}
          disabled={items.length === 0}
          className="w-full py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
