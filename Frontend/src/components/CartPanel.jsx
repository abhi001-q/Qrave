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
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-10 pb-6 pt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none italic uppercase">
            Order <span className="text-primary not-italic">Summary</span>
          </h2>
          <span className="bg-orange-50 text-primary text-[11px] font-black px-4 py-2 rounded-full uppercase tracking-widest border border-orange-100 shadow-sm">
            {items.reduce((acc, item) => acc + item.quantity, 0)} Items
          </span>
        </div>

        {/* Order Type Toggle */}
        <div className="bg-slate-50 p-1.5 rounded-2xl flex items-center mb-6 border border-slate-100">
          <button
            onClick={() => setOrderType("Dine In")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              orderType === "Dine In"
                ? "bg-white text-primary shadow-sm border border-slate-100"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              restaurant
            </span>
            Dine In
          </button>
          <button
            onClick={() => setOrderType("Delivery")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              orderType === "Delivery"
                ? "bg-white text-primary shadow-sm border border-slate-100"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              delivery_dining
            </span>
            Delivery
          </button>
        </div>

        {/* Table Number Form (Dine In) */}
        {orderType === "Dine In" && (
          <div className="mb-6 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 animate-in slide-in-from-top-4 duration-300">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.15em] mb-1.5 block px-1">
              Table Number
            </label>
            <input
              type="text"
              placeholder="Enter Table No (e.g. 05)"
              className="w-full bg-white border border-orange-100 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              value={tableNo}
              onChange={(e) => setTableNo(e.target.value)}
            />
          </div>
        )}

        {/* Delivery Form (Conditional) */}
        {orderType === "Delivery" && (
          <div className="mb-6 space-y-3 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 animate-in slide-in-from-top-4 duration-300">
            <div>
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.15em] mb-1.5 block px-1">
                Delivery Address
              </label>
              <input
                type="text"
                placeholder="Street address, apartment, etc."
                className="w-full bg-white border border-orange-100 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={deliveryDetails.location}
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    location: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.15em] mb-1.5 block px-1">
                ZIP / Postal Code
              </label>
              <input
                type="text"
                placeholder="e.g. 44600"
                className="w-full bg-white border border-orange-100 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={deliveryDetails.zipCode}
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    zipCode: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto min-h-0 px-8 custom-scrollbar">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-40 text-center">
            <div className="w-16 h-16 rounded-[28px] bg-slate-100 flex items-center justify-center text-slate-300 mb-4">
              <span className="material-symbols-outlined text-3xl">
                fastfood
              </span>
            </div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
              Order Box is Empty
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden border border-slate-100 shadow-inner flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black text-slate-900 truncate leading-tight mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-[11px] font-bold text-primary">
                    Rs. {Number(item.price).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1 shadow-inner">
                  <button
                    onClick={() =>
                      updateQty(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-primary transition-colors active:scale-90"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      remove
                    </span>
                  </button>
                  <span className="w-6 text-center text-xs font-black text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-primary transition-colors active:scale-90"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      add
                    </span>
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-lg">
                    close
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer - Payment & Checkout */}
      <div className="p-8 bg-slate-50/50 border-t border-slate-100">
        {/* Payment Select */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Payment Method
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaymentMethod("Cash")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black transition-all ${
                paymentMethod === "Cash"
                  ? "bg-white text-slate-800 border-slate-200 shadow-sm"
                  : "text-slate-400 border-transparent hover:bg-slate-100"
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                payments
              </span>
              CASH
            </button>
            <button
              onClick={() => setPaymentMethod("eSewa")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black transition-all ${
                paymentMethod === "eSewa"
                  ? "bg-[#60bb46] text-white border-[#60bb46] shadow-sm"
                  : "text-slate-400 border-transparent hover:bg-slate-100"
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                account_balance_wallet
              </span>
              eSewa
            </button>
          </div>
        </div>

        {/* Totals */}
        <div className="space-y-4 mb-10 px-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] opacity-70">
              Subtotal
            </span>
            <span className="text-slate-600 font-black text-sm tracking-tighter italic">
              Rs. {total.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] opacity-70">
              Tax (13%)
            </span>
            <span className="text-slate-600 font-black text-sm tracking-tighter italic">
              Rs. {(total * 0.13).toFixed(2)}
            </span>
          </div>
          <div className="h-px bg-slate-100 my-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200 to-transparent animate-shimmer"></div>
          </div>
          <div className="flex justify-between items-end pt-2">
            <span className="text-slate-900 font-black text-base uppercase tracking-[0.2em] leading-none mb-1">
              Total Pay
            </span>
            <div className="flex flex-col items-end">
              <span className="text-primary font-black text-4xl tracking-tighter leading-none">
                Rs. {(total * 1.13).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={items.length === 0}
          className="w-full py-5 bg-primary text-white rounded-3xl font-black text-sm uppercase tracking-[0.25em] shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}
