import React from "react";
import { useAuth } from "../hooks/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6 space-y-10 flex flex-col items-center">
      {/* User Card */}
      <div className="w-full relative pt-12">
        <div className="glass rounded-[3rem] p-8 pt-20 border-2 border-white shadow- premium flex flex-col items-center text-center space-y-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 rounded-[2rem] bg-white p-1.5 shadow-xl">
            <div className="w-full h-full rounded-[1.7rem] bg-gradient-to-tr from-primary to-orange-300 flex items-center justify-center text-white text-4xl font-black">
              {user?.name?.charAt(0) || "U"}
            </div>
          </div>
          
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">{user?.name || "Guest User"}</h2>
            <p className="text-primary font-bold text-sm tracking-widest uppercase">{user?.role || "Customer"}</p>
          </div>

          <div className="flex gap-4 w-full pt-4">
            <div className="flex-1 bg-white/50 rounded-2xl p-3 border border-white">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Orders</p>
              <p className="text-slate-800 font-black">12</p>
            </div>
            <div className="flex-1 bg-white/50 rounded-2xl p-3 border border-white">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Points</p>
              <p className="text-slate-800 font-black">450</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="w-full space-y-4">
        {[
          { icon: "person", label: "Edit Profile" },
          { icon: "notifications", label: "Notifications", badge: "2" },
          { icon: "credit_card", label: "Payments" },
          { icon: "help", label: "Help & Support" },
          { icon: "settings", label: "App Settings" },
        ].map((item) => (
          <button key={item.label} className="w-full bg-white rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm border border-slate-50 active:scale-95 transition-all">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400">{item.icon}</span>
              <span className="font-bold text-slate-600">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {item.badge && <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded-full">{item.badge}</span>}
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
            </div>
          </button>
        ))}
      </div>

      <button 
        onClick={logout}
        className="w-full bg-red-50 text-red-500 font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all border border-red-100"
      >
        <span className="material-symbols-outlined">logout</span>
        Sign Out
      </button>

      <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.2em]">Qrave v1.0.4 • Made with Love</p>
    </div>
  );
};

export default Profile;
