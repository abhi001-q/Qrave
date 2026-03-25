import React from "react";
import { Link } from "react-router-dom";

export default function PaymentFailure() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center pb-32">
      <div className="space-y-6">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-md border border-red-100">
          <span className="material-symbols-outlined text-4xl font-black">cancel</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Payment Failed</h2>
        <p className="text-slate-500 font-medium max-w-[250px] mx-auto">Your transaction was cancelled or failed. Please try again.</p>
        <Link to="/cart" className="btn-primary mt-6 py-3 px-8 text-sm inline-block">Return to Cart</Link>
      </div>
    </div>
  );
}
