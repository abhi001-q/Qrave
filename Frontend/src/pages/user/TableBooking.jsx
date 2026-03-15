import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Note: Depending on backend implementation, this would connect to bookingService.
// import bookingService from "../../services/bookingService";

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
    
    // Simulating API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
    
    /* 
    try {
      await bookingService.create(formData);
      setSuccess(true);
    } catch (err) {
      alert("Failed to book table. " + err.message);
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/20 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
        <h2 className="text-4xl font-black mb-4 tracking-tighter">Table Confirmed</h2>
        <p className="text-white/50 max-w-md mx-auto mb-8 font-light leading-relaxed">
          Your reservation for {formData.guests} people on {formData.date} at {formData.time} has been successfully secured. We look forward to hosting you!
        </p>
        <div className="flex gap-4">
          <button onClick={() => navigate("/dashboard")} className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-orange-500 hover:text-white transition-colors">
            Go to Dashboard
          </button>
          <button onClick={() => setSuccess(false)} className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/5 transition-colors">
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white pt-12 pb-24 relative overflow-hidden flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
            Reserve Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Experience</span>
          </h1>
          <p className="text-white/50 text-xl font-light">
            Secure your table instantly and prepare for an unforgettable dining journey.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-[#111] p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-bold text-white/50 mb-3 uppercase tracking-wider">Date</label>
              <input 
                type="date" 
                required
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-[#050505] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors calendar-picker-indicator-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-white/50 mb-3 uppercase tracking-wider">Time</label>
              <input 
                type="time" 
                required
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
                className="w-full bg-[#050505] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors time-picker-indicator-white"
              />
            </div>
          </div>
          
          <div className="mb-8">
            <label className="block text-sm font-bold text-white/50 mb-3 uppercase tracking-wider">Party Size: {formData.guests} {formData.guests > 1 ? 'Guests' : 'Guest'}</label>
            <div className="flex items-center gap-4 bg-[#050505] border border-white/10 rounded-2xl p-2 w-full max-w-xs">
              <button 
                type="button" 
                onClick={() => setFormData({...formData, guests: Math.max(1, formData.guests - 1)})}
                className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-xl font-medium"
              >-</button>
              <span className="flex-grow text-center text-xl font-bold">{formData.guests}</span>
              <button 
                type="button" 
                onClick={() => setFormData({...formData, guests: Math.min(20, formData.guests + 1)})}
                className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-xl font-medium"
              >+</button>
            </div>
          </div>

          <div className="mb-10">
            <label className="block text-sm font-bold text-white/50 mb-3 uppercase tracking-wider">Special Requests (Optional)</label>
            <textarea 
              value={formData.specialRequests}
              onChange={e => setFormData({...formData, specialRequests: e.target.value})}
              className="w-full bg-[#050505] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none"
              placeholder="Celebrating a birthday? Need a high chair? Let us know."
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-5 bg-white text-black rounded-2xl font-black text-lg uppercase tracking-wider hover:bg-blue-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-[0_10px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.3)] disabled:opacity-50 disabled:transform-none"
          >
            {isSubmitting ? "Confirming details..." : "Confirm Reservation"}
          </button>
        </form>
      </div>
      
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator,
        input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.5;
          cursor: pointer;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover,
        input[type="time"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
