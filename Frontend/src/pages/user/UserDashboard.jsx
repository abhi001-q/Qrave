import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function UserDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">Welcome back, <span className="text-orange-500">{user?.name?.split(' ')[0] || 'Guest'}</span></h1>
        <p className="text-white/50 text-lg">Here's your dining summary and quick actions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Quick Stats */}
        <div className="bg-[#111] p-8 border border-white/5 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-orange-500/20 transition-colors"></div>
          <div className="relative z-10 w-12 h-12 bg-orange-500/20 text-orange-500 rounded-xl flex items-center justify-center mb-6 border border-orange-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <h2 className="text-4xl font-black text-white mb-2">12</h2>
          <p className="text-white/50 font-medium">Total Orders</p>
        </div>

        <div className="bg-[#111] p-8 border border-white/5 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors"></div>
          <div className="relative z-10 w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>
          </div>
          <h2 className="text-4xl font-black text-white mb-2">3</h2>
          <p className="text-white/50 font-medium">Upcoming Reservations</p>
        </div>

        <div className="bg-[#111] p-8 border border-white/5 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-green-500/20 transition-colors"></div>
          <div className="relative z-10 w-12 h-12 bg-green-500/20 text-green-500 rounded-xl flex items-center justify-center mb-6 border border-green-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
          </div>
          <h2 className="text-4xl font-black text-white mb-2">$420</h2>
          <p className="text-white/50 font-medium">Total Spent</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-[#111] p-8 border border-white/5 rounded-3xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Quick Actions
          </h3>
          <div className="space-y-4">
            <Link to="/menu" className="flex items-center justify-between p-5 bg-[#050505] border border-white/5 hover:border-orange-500/30 rounded-2xl group transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:text-orange-500 group-hover:bg-orange-500/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">Order Now</h4>
                  <p className="text-xs text-white/40">Browse digital menu</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all"><path d="m9 18 6-6-6-6"/></svg>
            </Link>

            <Link to="/book-table" className="flex items-center justify-between p-5 bg-[#050505] border border-white/5 hover:border-blue-500/30 rounded-2xl group transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">Book Table</h4>
                  <p className="text-xs text-white/40">Reserve your spot</p>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#111] p-8 border border-white/5 rounded-3xl overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <Link to="/orders" className="text-sm text-orange-500 hover:text-orange-400 font-bold">See All</Link>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            {/* Dummy activity data */}
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                  <div>
                    <h4 className="font-bold text-sm">Order Delivered</h4>
                    <p className="text-xs text-white/40">ORD-1038C • 2 days ago</p>
                  </div>
                </div>
                <span className="font-bold text-sm">$112.00</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                  <div>
                    <h4 className="font-bold text-sm">Table Reserved</h4>
                    <p className="text-xs text-white/40">Tomorrow, 7:00 PM • 2 Guests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
