import React from "react";

export default function SystemHealth() {
  const services = [
    { name: "Frontend Load Balancer", status: "Operational", uptime: "99.99%", latency: "12ms" },
    { name: "Main API Gateway", status: "Operational", uptime: "99.95%", latency: "45ms" },
    { name: "Authentication Service", status: "Operational", uptime: "100%", latency: "18ms" },
    { name: "Database Cluster Primary", status: "Operational", uptime: "99.98%", latency: "5ms" },
    { name: "Payment Gateway Integration", status: "Degraded", uptime: "98.50%", latency: "450ms" },
    { name: "Email Notification Service", status: "Operational", uptime: "99.90%", latency: "120ms" },
  ];

  return (
    <div className="w-full">
      <div className="mb-10">
         <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">System <span className="text-red-500">Diagnostics</span></h1>
         <p className="text-white/50 text-lg">Real-time status of microservices and infrastructure.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_50px_rgba(239,68,68,0.05)]">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-4 border-[#050505] shadow-xl flex items-center justify-center bg-gradient-to-tr from-green-500/20 to-green-500/5 text-green-500 z-10 relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-white">All Systems Normal</h2>
            <p className="text-green-500 font-bold text-sm tracking-widest uppercase mt-1">Minor degradation detected</p>
          </div>
        </div>
        
        <div className="flex gap-4">
           <div className="text-center bg-[#050505] px-6 py-3 rounded-2xl border border-white/5">
             <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Global Traffic</p>
             <p className="text-2xl font-black text-white">14.2k <span className="text-[10px] text-white/30">req/m</span></p>
           </div>
           <div className="text-center bg-[#050505] px-6 py-3 rounded-2xl border border-white/5">
             <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Error Rate</p>
             <p className="text-2xl font-black text-white">0.02%</p>
           </div>
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#050505]">
          <h2 className="text-xl font-bold">Service Endpoints</h2>
          <button className="text-xs font-bold text-white/50 hover:text-white flex items-center gap-2 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l5.25-4.2"/></svg>
            Refresh Now
          </button>
        </div>
        
        <div className="divide-y divide-white/5">
          {services.map((svc, i) => (
            <div key={i} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-white/5 transition-colors">
               <div className="flex items-center gap-4">
                 <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${svc.status === 'Operational' ? 'bg-green-500 shadow-green-500/50' : 'bg-orange-500 shadow-orange-500/50 animate-pulse'}`}></div>
                 <div>
                   <h3 className="font-bold text-white/90">{svc.name}</h3>
                   <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">{svc.status}</p>
                 </div>
               </div>
               
               <div className="flex items-center gap-8 w-full md:w-auto">
                 <div className="flex-1 md:flex-none">
                   <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Uptime</p>
                   <p className="text-sm font-bold text-white">{svc.uptime}</p>
                 </div>
                 <div className="flex-1 md:flex-none">
                   <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Latency</p>
                   <p className={`text-sm font-bold ${svc.latency.length > 4 ? 'text-orange-500' : 'text-white'}`}>{svc.latency}</p>
                 </div>
                 <div className="hidden md:block w-32">
                   <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex items-center">
                     <div className={`h-full rounded-full ${svc.status === 'Operational' ? 'bg-green-500' : 'bg-orange-500'} opacity-50 w-full`}></div>
                   </div>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
