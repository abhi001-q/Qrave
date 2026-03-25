import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

export default function CartPage() {
  const { items, updateQty, removeItem, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      // If guest, direct them to login first, then redirect back to checkout
      navigate("/login?redirect=/checkout");
    } else {
      navigate("/checkout");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/30"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </div>
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-white/50 max-w-md mx-auto mb-8 font-light">Explore our curated digital menu and add some exquisite dishes to your order.</p>
        <Link to="/menu" className="px-8 py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-colors">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 pb-24 px-6 md:px-12 max-w-6xl mx-auto w-full">
      <h1 className="text-4xl md:text-5xl font-black mb-12 tracking-tighter">Your <span className="text-orange-500">Selection</span></h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 bg-[#111] p-4 rounded-3xl border border-white/5">
              <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow flex flex-col w-full">
                <div className="flex justify-between items-start mb-2 w-full">
                  <h3 className="text-xl font-bold text-white pr-4">{item.title}</h3>
                  <button onClick={() => removeItem(item.id)} className="text-white/30 hover:text-red-500 transition-colors shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                  </button>
                </div>
                
                <p className="text-orange-400 font-bold mb-4">Rs. {Number(item.price).toFixed(2)}</p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="flex items-center bg-[#050505] rounded-full border border-white/10">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors">-</button>
                    <span className="w-8 text-center font-bold">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors">+</button>
                  </div>
                  <div className="text-white/50 text-sm font-medium">
                    Total: <span className="text-white">Rs. {(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 sticky top-28">
            <h3 className="text-2xl font-bold mb-6 border-b border-white/5 pb-4">Order Summary</h3>
            
            <div className="space-y-4 mb-8 text-white/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">Rs. {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees (10%)</span>
                <span className="text-white">Rs. {(total * 0.1).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8 pt-4 border-t border-white/5">
              <span className="text-lg font-bold">Total</span>
              <span className="text-3xl font-black text-orange-500">Rs. {(total * 1.1).toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105"
            >
              Proceed to Checkout
            </button>
            {!user && (
              <p className="text-center text-white/40 text-xs mt-4">You will be asked to sign in to complete your order.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
