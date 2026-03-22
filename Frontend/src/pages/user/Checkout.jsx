import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { orderService } from "../../services/orderService";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [tableNumber, setTableNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const grandTotal = total * 1.1; // adding 10% tax/fees

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!tableNumber) return alert("Please enter your table number.");
    if (items.length === 0) return alert("Cart is empty");

    setIsSubmitting(true);
    try {
      const orderData = {
        tableId: parseInt(tableNumber), // assuming table ID is needed
        items: items.map(i => ({ productId: i.id, quantity: i.qty, price: i.price })),
        paymentMethod,
        totalAmount: grandTotal,
        status: "PENDING"
      };
      
      const response = await orderService.create(orderData);
      clearCart();
      // Redirect to order success/details page
      navigate(`/orders/${response.data?.id || 'success'}`);
    } catch (error) {
      console.error("Order creation failed", error);
      alert(error.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
          <button onClick={() => navigate('/menu')} className="text-orange-500 underline">Return to Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-10 tracking-tight">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            <div className="bg-[#111] p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-bold mb-6 border-b border-white/5 pb-4">Dining Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">Table Number</label>
                  <input 
                    type="number" 
                    value={tableNumber} 
                    onChange={e => setTableNumber(e.target.value)}
                    required
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="e.g. 12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/50 mb-2">Special Instructions (Optional)</label>
                  <textarea 
                    className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors h-24"
                    placeholder="Any allergies or dietary requirements?"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#111] p-8 rounded-3xl border border-white/5">
              <h3 className="text-xl font-bold mb-6 border-b border-white/5 pb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'ONLINE' ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 hover:bg-white/5'}`}>
                  <input type="radio" value="ONLINE" checked={paymentMethod === 'ONLINE'} onChange={() => setPaymentMethod('ONLINE')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${paymentMethod === 'ONLINE' ? 'border-orange-500' : 'border-white/30'}`}>
                    {paymentMethod === 'ONLINE' && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
                  </div>
                  <span className="font-medium">Pay Online (Card / Wallet)</span>
                </label>
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'CASH' ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 hover:bg-white/5'}`}>
                  <input type="radio" value="CASH" checked={paymentMethod === 'CASH'} onChange={() => setPaymentMethod('CASH')} className="hidden" />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${paymentMethod === 'CASH' ? 'border-orange-500' : 'border-white/30'}`}>
                    {paymentMethod === 'CASH' && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>}
                  </div>
                  <span className="font-medium">Cash on Table</span>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-orange-500 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : `Complete Order • $${grandTotal.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div>
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 sticky top-28">
            <h3 className="text-2xl font-bold mb-6 border-b border-white/5 pb-4">Order Summary</h3>
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#050505] w-6 h-6 rounded-md flex items-center justify-center border border-white/10 text-white/70 font-bold text-xs">{item.qty}</span>
                    <span className="font-medium text-white/90 truncate max-w-[150px]">{item.title}</span>
                  </div>
                  <span className="text-white/70">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 pt-6 border-t border-white/5 text-sm text-white/50 mb-6">
              <div className="flex justify-between"><span>Subtotal</span><span className="text-white">${total.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Taxes & Fees</span><span className="text-white">${(total * 0.1).toFixed(2)}</span></div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <span className="text-lg font-bold">Total Pay</span>
              <span className="text-3xl font-black text-orange-500">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
