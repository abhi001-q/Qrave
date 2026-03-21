import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentFailure() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-700">
      <div className="w-24 h-24 bg-orange-50 text-orange-500 rounded-[40px] flex items-center justify-center mx-auto shadow-xl shadow-orange-100 border border-orange-100 mb-10">
        <span className="material-symbols-outlined text-5xl font-black">cancel</span>
      </div>
      
      <div className="space-y-6 mb-12">
        <h2 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter italic uppercase">
          Payment <span className="text-primary not-italic">Unsuccessful</span>
        </h2>
        <p className="text-slate-500 font-bold text-lg max-w-md mx-auto leading-relaxed border-l-4 border-primary/20 pl-6">
          Your transaction was either cancelled or couldn't be processed by eSewa at this time. No funds were deducted from your account.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <button 
          onClick={() => navigate("/menu")}
          className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-3xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 hover:scale-[1.05] active:scale-[0.98] transition-all"
        >
          Back to Menu
        </button>
        <button 
          onClick={() => navigate("/dashboard")}
          className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-100 text-slate-400 rounded-3xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-50 hover:text-slate-600 transition-all"
        >
          My Dashboard
        </button>
      </div>
      
      <p className="mt-16 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
        Need help? Contact our checkout support team.
      </p>
    </div>
  );
}
