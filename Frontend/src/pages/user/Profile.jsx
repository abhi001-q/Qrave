import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: user?.phone || "+1 234 567 890",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-10">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">My <span className="text-orange-500">Profile</span></h1>
        <p className="text-white/50 text-lg">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 flex items-center justify-center font-black text-4xl shadow-[0_10px_40px_rgba(249,115,22,0.3)] mb-6 text-white border-4 border-[#050505]">
              {formData.name.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold mb-1">{formData.name}</h2>
            <p className="text-orange-500 font-bold text-sm uppercase tracking-widest">{user?.role || 'Guest Member'}</p>
            <p className="text-white/30 text-xs mt-4">Member since Mar 2026</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-10">
            <h3 className="text-xl font-bold mb-8 border-b border-white/5 pb-4">Personal Details</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white/50 mb-3 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white/50 mb-3 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  disabled
                  className="w-full bg-[#050505]/50 border border-white/5 rounded-2xl px-5 py-4 text-white/50 cursor-not-allowed"
                />
                <p className="text-xs text-white/30 mt-2">Email address cannot be changed.</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-white/50 mb-3 uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-[#050505] border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/5 flex gap-4 justify-end">
              <button disabled={isSaving} type="submit" className="px-8 py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center gap-2">
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
