import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { bookingService } from "../../services/bookingService";

export default function TableBooking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 2,
    specialRequests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await bookingService.create(formData);
      setSuccess(true);
      toast.success("Reservation request sent to the restaurant!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit booking");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 bg-white animate-in zoom-in duration-500">
        <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-10 border-4 border-white shadow-2xl shadow-green-100/50 text-green-500 transition-transform hover:scale-110">
          <span className="material-symbols-outlined text-6xl">verified</span>
        </div>
        <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Table <span className="text-green-600">Confimed</span></h2>
        <p className="text-slate-400 max-w-md mx-auto mb-10 font-bold leading-relaxed text-lg">
          We've secured Table #4 for your party of {formData.guests} on {formData.date} at {formData.time}.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <button 
            onClick={() => navigate("/dashboard")} 
            className="flex-1 px-8 py-5 bg-slate-900 text-white rounded-[28px] font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            Dashboard
          </button>
          <button 
            onClick={() => setSuccess(false)} 
            className="flex-1 px-8 py-5 bg-white border border-slate-100 text-slate-400 rounded-[28px] font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95"
          >
            New Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-20 pb-24 relative overflow-hidden flex flex-col items-center animate-in fade-in duration-1000">
      
      {/* Premium background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-50/50 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-2xl mb-6 border border-purple-100">
             <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
             <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Priority Seat reservations</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
            Reserve Your <span className="text-purple-600">Spot</span>
          </h1>
          <p className="text-slate-400 text-xl font-bold max-w-2xl mx-auto leading-relaxed">
            Secure your table instantly and prepare for an exceptional culinary journey.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 rounded-[60px] border border-slate-50 shadow-[0_30px_100px_rgba(0,0,0,0.04)] relative">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div>
              <label className="block text-[10px] font-black text-slate-400 mb-4 px-1 uppercase tracking-widest">Select Date</label>
              <input 
                type="date" 
                required
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-8 py-5 text-slate-900 font-bold outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-black text-slate-400 mb-4 px-1 uppercase tracking-widest">Arrival Time</label>
              <input 
                type="time" 
                required
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-8 py-5 text-slate-900 font-bold outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 transition-all"
              />
            </div>
          </div>
          
          <div className="mb-10">
            <label className="block text-[10px] font-black text-slate-400 mb-4 px-1 uppercase tracking-widest">Party Size: {formData.guests} Guests</label>
            <div className="flex items-center gap-6 bg-slate-50 border border-slate-100 rounded-3xl p-3 w-full max-w-xs">
              <button 
                type="button" 
                onClick={() => setFormData({...formData, guests: Math.max(1, formData.guests - 1)})}
                className="w-14 h-14 flex items-center justify-center bg-white border border-slate-100 rounded-2xl hover:bg-slate-100 transition-all text-2xl font-black text-slate-900 shadow-sm"
              >-</button>
              <span className="flex-grow text-center text-3xl font-black text-slate-900 tabular-nums">{formData.guests}</span>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, guests: Math.min(20, formData.guests + 1)})}
                className="w-14 h-14 flex items-center justify-center bg-white border border-slate-100 rounded-2xl hover:bg-slate-100 transition-all text-2xl font-black text-slate-900 shadow-sm"
              >+</button>
            </div>
          </div>

          <div className="mb-14">
            <label className="block text-[10px] font-black text-slate-400 mb-4 px-1 uppercase tracking-widest">Special Requests (Optional)</label>
            <textarea 
              value={formData.specialRequests}
              onChange={e => setFormData({...formData, specialRequests: e.target.value})}
              className="w-full bg-slate-50 border border-slate-100 rounded-[32px] px-8 py-6 text-slate-900 font-bold outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 transition-all h-40 resize-none"
              placeholder="Celebrating a birthday or anniversary? Let us know."
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-[32px] font-black text-lg uppercase tracking-[0.2em] shadow-2xl shadow-purple-200 hover:shadow-purple-400 hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50 disabled:transform-none"
          >
            {isSubmitting ? "Securing Table..." : "Confirm Reservation"}
          </button>
        </form>

        <div className="mt-12 text-center text-slate-300 font-bold text-sm uppercase tracking-[0.3em]">
          Qrave Premium Dining Network
        </div>
      </div>
    </div>
  );
}
