import React, { useState, useEffect } from "react";
import { managerService } from "../../services/managerService";
import { toast } from "react-toastify";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("Last 7 Days");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await managerService.getAnalytics();
        setAnalytics(data);
      } catch (err) {
        toast.error("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeRange]);

  if (loading || !analytics) {
    return (
       <div className="w-full flex-1 flex items-center justify-center min-h-[50vh]">
         <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
       </div>
    );
  }

  const kpis = [
    { name: "Gross Revenue", value: `$${Number(analytics.grossRevenue).toLocaleString()}`, trend: "Stable", color: "text-purple-600", bg: "bg-purple-50", icon: "payments" },
    { name: "Avg. Order Value", value: `$${Number(analytics.avgOrderValue).toFixed(2)}`, trend: "Stable", color: "text-blue-600", bg: "bg-blue-50", icon: "shopping_bag" },
    { name: "Total Orders", value: Number(analytics.totalOrders).toLocaleString(), trend: "Growing", color: "text-green-600", bg: "bg-green-50", icon: "receipt_long" },
    { name: "New Customers", value: Number(analytics.newCustomers).toLocaleString(), trend: "Last 30D", color: "text-orange-600", bg: "bg-orange-50", icon: "person_add" },
  ];

  // Process sales data for char. For simplicity, just use heights relative to the max.
  const rawSales = analytics.salesData || [];
  let maxSale = Math.max(...rawSales.map(s => Number(s.total) || 0), 1);
  // Pad the array if needed to roughly 7 days for UI
  const days = ["D-6", "D-5", "D-4", "D-3", "D-2", "D-1", "Today"];
  let chartBars = Array(7).fill({ total: 0, date: "N/A" }).map((d, i) => rawSales[i] || d);
  const salesData = chartBars.map(s => ((Number(s.total || 0) / maxSale) * 100)); // Height %

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Performance <span className="text-purple-600">Analytics</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Deep insights into your restaurant's digital growth.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
          {["Last 7 Days", "Last 30 Days", "Current Year"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                timeRange === range
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.name} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
            <div className={`absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity ${kpi.color}`}>
              <span className="material-symbols-outlined text-8xl">{kpi.icon}</span>
            </div>
            
            <div className="flex justify-between items-start mb-8">
              <div className={`w-14 h-14 ${kpi.bg} ${kpi.color} rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-2xl">{kpi.icon}</span>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${kpi.bg} ${kpi.color}`}>
                {kpi.trend}
              </span>
            </div>
            
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{kpi.value}</h3>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-loose">{kpi.name}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-[48px] border border-slate-100 shadow-sm p-10 flex flex-col min-h-[460px]">
          <header className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Revenue Dynamics</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Growth overview across time</p>
            </div>
            <div className="flex items-center gap-2">
               <span className="w-3 h-3 rounded-full bg-purple-600"></span>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross Sales</span>
            </div>
          </header>

          <div className="flex-1 flex items-end justify-between gap-4 md:gap-8 px-2 relative">
             {/* Grid Lines */}
             <div className="absolute inset-0 flex flex-col justify-between opacity-5">
                {[1, 2, 3, 4, 5].map((i) => (
                   <div key={i} className="w-full h-px bg-slate-900"></div>
                ))}
             </div>

             {salesData.map((h, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-6 group relative z-10">
                  <div className="relative w-full flex items-end grow bg-slate-50/50 rounded-3xl overflow-hidden group-hover:bg-purple-50 transition-colors">
                     <div 
                      className="w-full bg-gradient-to-t from-purple-600 via-purple-500 to-indigo-500 rounded-t-2xl group-hover:brightness-110 transition-all duration-1000 ease-out shadow-lg shadow-purple-100/50"
                      style={{ height: `${h}%` }}
                     >
                       <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-lg text-[10px] font-black text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                          ${Number(chartBars[i]?.total || 0).toFixed(2)}
                       </div>
                     </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter group-hover:text-purple-600 transition-colors">{days[i]}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Top Sellers */}
        <div className="bg-white rounded-[48px] border border-slate-100 shadow-sm p-10 flex flex-col relative overflow-hidden">
           <div className="absolute top-0 right-0 w-48 h-48 bg-purple-50/50 rounded-full blur-[60px] -mr-20 -mt-20"></div>
           
           <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1 relative z-10">Top Performers</h3>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-10 relative z-10">Best-selling menu items</p>
           
           <div className="space-y-6 relative z-10">
              {analytics.topPerformers?.length === 0 ? (
                 <p className="text-sm font-bold text-slate-400">Not enough data to determine top performers.</p>
              ) : analytics.topPerformers?.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-4 group cursor-default">
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 font-black text-sm border border-slate-100 group-hover:bg-white group-hover:border-purple-200 transition-all">
                      {idx + 1}
                   </div>
                   <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-end mb-2">
                         <h4 className="text-sm font-black text-slate-900 group-hover:text-purple-600 transition-colors uppercase tracking-tight">{item.name}</h4>
                         <span className="text-[10px] font-black text-purple-600">${Number(item.revenue).toFixed(2)}/unit</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                         <div className={`h-full ${item.color || 'bg-purple-600'} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${(Math.random() * 50) + 50}%` }}></div>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-auto pt-10">
              <button className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 hover:shadow-slate-300 hover:scale-[1.02] active:scale-[0.98] transition-all">
                 Download Full Report
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
