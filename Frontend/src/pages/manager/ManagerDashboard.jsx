import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ManagerDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching analytical data for the dashboard
    const fetchDashboardStats = () => {
      setTimeout(() => {
        setStats({
          todayRevenue: 1245.50,
          ordersToday: 64,
          pendingOrders: 12,
          tablesOccupied: 8,
          totalTables: 20,
          profitMargin: 35, // percentage
        });
        setLoading(false);
      }, 1000);
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">Operation <span className="text-purple-500">Overview</span></h1>
          <p className="text-white/50 text-lg">Real-time metrics and daily performance indicators.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-sm font-bold text-green-500 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            System Online
          </span>
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Core Metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#111] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center border border-green-500/20">
              <span className="font-serif italic text-xl font-bold">$</span>
            </div>
            <span className="text-green-500 text-sm font-bold flex items-center gap-1">+14.5%</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-1">${stats.todayRevenue.toFixed(2)}</h2>
          <p className="text-white/40 font-medium text-sm uppercase tracking-wider">Today's Revenue</p>
        </div>

        <div className="bg-[#111] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <span className="text-white/30 text-sm font-bold flex items-center gap-1">Orders</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-1">{stats.ordersToday}</h2>
          <p className="text-white/40 font-medium text-sm uppercase tracking-wider">Completed Today</p>
        </div>

        <div className="bg-[#111] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center border border-orange-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
            </div>
            <span className="text-red-500 text-sm font-bold flex items-center gap-1 animate-pulse">Action Req.</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-1">{stats.pendingOrders}</h2>
          <p className="text-white/40 font-medium text-sm uppercase tracking-wider">Pending Orders</p>
        </div>

        <div className="bg-[#111] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center border border-purple-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M16 2v4 M8 2v4 M3 10h18"/></svg>
            </div>
            <span className="text-purple-400 text-sm font-bold flex items-center gap-1">{((stats.tablesOccupied / stats.totalTables) * 100).toFixed(0)}% Util.</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-1">{stats.tablesOccupied}<span className="text-2xl text-white/30">/{stats.totalTables}</span></h2>
          <p className="text-white/40 font-medium text-sm uppercase tracking-wider">Tables Occupied</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#111] border border-white/5 rounded-3xl p-8 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <h3 className="text-xl font-bold">Revenue Trend</h3>
            <select className="bg-[#050505] border border-white/10 rounded-lg px-3 py-1 text-sm font-bold text-white outline-none">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          
          <div className="flex-1 flex items-end gap-2 justify-between mt-auto mx-4">
            {/* Mock Chart rendering */}
            {[40, 70, 45, 90, 65, 80, 100].map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div className="relative w-full bg-[#151515] rounded-t-lg overflow-hidden flex items-end h-[200px] hover:bg-white/5 transition-colors">
                  <div 
                    className="w-full bg-gradient-to-t from-purple-600/50 to-purple-400 rounded-t-md group-hover:from-purple-500 group-hover:to-purple-300 transition-all duration-500"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-white/40 uppercase">Day {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#111] border border-white/5 rounded-3xl p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
          </div>
          
          <div className="space-y-4 flex-1">
            <Link to="/manager/orders" className="flex items-center gap-4 bg-[#050505] p-5 rounded-2xl border border-white/5 hover:border-orange-500/30 group transition-colors">
               <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/50 group-hover:text-orange-500 group-hover:bg-orange-500/10">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
               </div>
               <div className="flex-1">
                 <h4 className="font-bold text-white group-hover:text-orange-400 transition-colors">Manage Orders</h4>
                 <p className="text-xs text-white/40">12 Pending right now</p>
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-orange-500 group-hover:translate-x-1 transition-all"><path d="m9 18 6-6-6-6"/></svg>
            </Link>

            <Link to="/manager/products" className="flex items-center gap-4 bg-[#050505] p-5 rounded-2xl border border-white/5 hover:border-purple-500/30 group transition-colors">
               <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/50 group-hover:text-purple-500 group-hover:bg-purple-500/10">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16.2A2 2 0 0 0 21.6 14L22 10a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2l.4 4a2 2 0 0 0 1.6 2.2V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z"/></svg>
               </div>
               <div className="flex-1">
                 <h4 className="font-bold text-white group-hover:text-purple-400 transition-colors">Menu & Products</h4>
                 <p className="text-xs text-white/40">Add, edit or disable items</p>
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-purple-500 group-hover:translate-x-1 transition-all"><path d="m9 18 6-6-6-6"/></svg>
            </Link>

            <Link to="/manager/bills" className="flex items-center gap-4 bg-[#050505] p-5 rounded-2xl border border-white/5 hover:border-green-500/30 group transition-colors">
               <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/50 group-hover:text-green-500 group-hover:bg-green-500/10">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
               </div>
               <div className="flex-1">
                 <h4 className="font-bold text-white group-hover:text-green-400 transition-colors">Print Bills</h4>
                 <p className="text-xs text-white/40">Manual invoice generation</p>
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-green-500 group-hover:translate-x-1 transition-all"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
