import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bookingService } from "../../services/bookingService";
import { managerService } from "../../services/managerService";

export default function ManagerDashboard() {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [bookingsData, analyticsData] = await Promise.all([
          bookingService.getAllAsManager(),
          managerService.getAnalytics()
        ]);
        
        setBookings(bookingsData.slice(0, 5));

        setStats({
          todayRevenue: analyticsData.todayRevenue || 0,
          ordersToday: analyticsData.ordersToday || 0,
          pendingOrders: analyticsData.pendingOrders || 0,
          tablesOccupied: analyticsData.tablesOccupied || 0,
          totalTables: analyticsData.totalTables || 20,
          profitMargin: 35,
        });
      } catch (err) {
        console.error("Dashboard failed to load", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="w-full flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  const coreMetrics = [
    { name: "Today's Revenue", value: `Rs. ${Number(stats.todayRevenue).toFixed(2)}`, trend: "+14.5%", icon: "payments", color: "text-green-600", bg: "bg-green-50" },
    { name: "Orders Completed", value: stats.ordersToday, trend: "Stable", icon: "done_all", color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Pending Orders", value: stats.pendingOrders, trend: "Action Req.", icon: "pending_actions", color: "text-orange-600", bg: "bg-orange-50", animate: true },
    { name: "Table Occupancy", value: `${stats.tablesOccupied}/${stats.totalTables}`, trend: `${Math.round((stats.tablesOccupied / stats.totalTables) * 100)}% Util.`, icon: "event_seat", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Kitchen <span className="text-primary italic">Control</span> center
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Real-time metrics and operational performance.</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-bold text-green-700">System Online</span>
           </div>
           <p className="text-slate-400 text-xs font-black uppercase tracking-widest">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
           </p>
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {coreMetrics.map((metric) => (
          <div key={metric.name} className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity ${metric.color}`}>
               <span className="material-symbols-outlined text-8xl">{metric.icon}</span>
            </div>
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 ${metric.bg} ${metric.color} rounded-2xl flex items-center justify-center shadow-inner`}>
                <span className="material-symbols-outlined">{metric.icon}</span>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${metric.bg} ${metric.color} ${metric.animate ? 'animate-pulse' : ''}`}>
                {metric.trend}
              </span>
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{metric.value}</h3>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{metric.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 md:p-10 flex flex-col">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-50">
            <h3 className="text-xl font-extrabold text-slate-900 border-b-4 border-primary pb-2 inline-block">Revenue Trend</h3>
            <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 outline-none focus:ring-2 focus:ring-primary/20 transition-all">
              <option>Last 7 Days</option>
              <option>Current Month</option>
              <option>Year to Date</option>
            </select>
          </div>
          
          <div className="flex-1 flex items-end gap-3 md:gap-5 justify-between px-2 h-[200px]">
             {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="relative w-full bg-slate-50 rounded-2xl overflow-hidden flex items-end grow hover:bg-orange-50 transition-colors">
                     <div 
                      className="w-full bg-gradient-to-t from-primary to-orange-400 rounded-t-xl group-hover:to-orange-300 transition-all duration-700 shadow-lg shadow-primary/10"
                      style={{ height: `${h}%` }}
                     ></div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Day {i+1}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Quick Management Links */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 flex flex-col relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
           <h3 className="text-xl font-extrabold text-slate-900 mb-8 relative z-10">Quick Actions</h3>
           
           <div className="space-y-4 relative z-10">
              <Link to="/manager/orders" className="flex items-center gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-primary/30 group transition-all">
                 <div className="w-12 h-12 rounded-2xl bg-white text-slate-400 group-hover:text-primary transition-all flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined">list_alt</span>
                 </div>
                 <div className="flex-1">
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-primary transition-colors">Order Management</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">12 active orders</p>
                 </div>
                 <span className="material-symbols-outlined text-slate-200 group-hover:text-primary transition-all group-hover:translate-x-1">chevron_right</span>
              </Link>

              <Link to="/manager/products" className="flex items-center gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-purple-300 group transition-all">
                 <div className="w-12 h-12 rounded-2xl bg-white text-slate-400 group-hover:text-purple-600 transition-all flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined">inventory_2</span>
                 </div>
                 <div className="flex-1">
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-purple-600 transition-colors">Product Catalog</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Edit menu items</p>
                 </div>
                 <span className="material-symbols-outlined text-slate-200 group-hover:text-purple-600 transition-all group-hover:translate-x-1">chevron_right</span>
              </Link>

              <Link to="/manager/bills" className="flex items-center gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:border-green-300 group transition-all">
                 <div className="w-12 h-12 rounded-2xl bg-white text-slate-400 group-hover:text-green-600 transition-all flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined">point_of_sale</span>
                 </div>
                 <div className="flex-1">
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-green-600 transition-colors">Invoicing</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Manual bill gen</p>
                 </div>
                 <span className="material-symbols-outlined text-slate-200 group-hover:text-green-600 transition-all group-hover:translate-x-1">chevron_right</span>
              </Link>
           </div>

           <div className="mt-8 bg-orange-50 p-6 rounded-3xl border border-orange-100 flex items-center gap-4 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-xl transition-all group-hover:scale-150 duration-700"></div>
              <div className="relative z-10">
                 <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">PRO TIP</p>
                 <p className="text-xs font-bold text-slate-700 leading-relaxed">
                   Use the <span className="font-black">Digital POS</span> on tablets for faster tableside ordering.
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* Bookings Section */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8 flex flex-col mt-8">
         <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
            <h3 className="text-xl font-extrabold text-slate-900 border-b-4 border-purple-500 pb-2 inline-block">Recent Table Bookings</h3>
            <Link to="/manager/tables" className="text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors uppercase tracking-widest flex items-center gap-1">
              View All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
         </div>

         {bookings.length === 0 ? (
           <div className="text-center py-10 text-slate-400 font-bold">No recent bookings.</div>
         ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {bookings.map(booking => (
               <div key={booking.id} className="bg-slate-50 rounded-3xl p-6 border border-slate-100 hover:border-purple-200 transition-colors flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white text-purple-600 flex items-center justify-center shadow-sm">
                     <span className="material-symbols-outlined">deck</span>
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{booking.user_name || "Guest Walk-in"}</h4>
                    <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">
                      {new Date(booking.booking_time).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="px-3 py-1 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-500 tracking-widest shadow-sm">
                        {booking.guests} Guests
                      </span>
                      <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                        booking.status === 'Confirmed' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
               </div>
             ))}
           </div>
         )}
      </div>
    </div>
  );
}
