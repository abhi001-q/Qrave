import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function UserDashboard() {
  const { user } = useAuth();

  const stats = [
    { name: "Total Orders", value: "12", icon: "receipt_long", color: "text-primary", bg: "bg-orange-50" },
    { name: "Live Vouchers", value: "05", icon: "confirmation_number", color: "text-green-600", bg: "bg-green-50" },
    { name: "Spend Log", value: "Rs. 420", icon: "payments", color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Rewards", value: "850", icon: "stars", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-12">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Good Afternoon, <br />
            <span className="text-primary italic">{user?.name?.split(" ")[0] || "Friend"}! 👋</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Here's what's happening with your account today.</p>
        </div>
        <div className="flex gap-3">
           <Link to="/menu" className="btn-primary flex items-center gap-2 group">
             <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">add_circle</span>
             <span>New Order</span>
           </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity ${stat.color}`}>
               <span className="material-symbols-outlined text-8xl">{stat.icon}</span>
            </div>
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.name}</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 md:p-10 divide-y divide-slate-50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-extrabold text-slate-900 pb-2 border-b-4 border-primary inline-block">Recent Activity</h3>
            <Link to="/orders" className="text-sm font-bold text-primary hover:underline">View History</Link>
          </div>
          
          <div className="space-y-0">
            {/* Activity Item 1 */}
            <div className="flex items-center gap-6 py-6 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-green-50 group-hover:text-green-600 transition-all shadow-sm">
                <span className="material-symbols-outlined text-2xl">check_circle</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">Pizza Margherita Delivered</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mt-1">ORD-4829 • 2 hrs ago • Rs. 14.50</p>
              </div>
              <div className="text-right">
                 <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest">Delivered</span>
              </div>
            </div>

            {/* Activity Item 2 */}
            <div className="flex items-center gap-6 py-6 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all shadow-sm">
                <span className="material-symbols-outlined text-2xl">event_available</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">Table Reservation Confirmed</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mt-1">Friday, Sep 24 • 7:30 PM • 2 Guests</p>
              </div>
              <div className="text-right">
                 <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest">Confirmed</span>
              </div>
            </div>

            {/* Activity Item 3 */}
            <div className="flex items-center gap-6 py-6 group cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-primary transition-all shadow-sm">
                <span className="material-symbols-outlined text-2xl">pending_actions</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">Order Under Preparation</h4>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mt-1">ORD-9102 • 15 mins ago • Rs. 22.00</p>
              </div>
              <div className="text-right">
                 <span className="px-3 py-1 rounded-full bg-orange-100 text-primary text-[10px] font-black uppercase tracking-widest">Preparing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions / Promotion */}
        <div className="space-y-8">
           <div className="bg-primary p-8 rounded-[40px] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <div className="relative z-10 text-center">
                 <h4 className="text-2xl font-black mb-4">Refer a friend & get Rs. 1000</h4>
                 <p className="text-white/80 text-sm font-medium mb-8 leading-relaxed">Share your code and get rewards on every successful signup and order.</p>
                 <button className="w-full bg-white text-primary py-4 rounded-2xl font-black hover:bg-slate-50 transition-all active:scale-95 shadow-lg">
                    Invite Now
                 </button>
              </div>
           </div>

           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-6">Account Status</h3>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                       <span className="text-slate-400 uppercase tracking-widest text-[10px]">Tier Progress (Bronze)</span>
                       <span className="text-slate-900 uppercase tracking-widest text-[10px]">85%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-primary w-[85%] rounded-full shadow-sm"></div>
                    </div>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                       <span className="material-symbols-outlined">security</span>
                    </div>
                    <div>
                       <p className="text-xs font-bold text-slate-900">Email Verified</p>
                       <p className="text-[10px] font-bold text-slate-400">Account is active</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
