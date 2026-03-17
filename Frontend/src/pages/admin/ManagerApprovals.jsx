import React, { useState } from "react";

export default function ManagerApprovals() {
  const [requests, setRequests] = useState([
    { id: "REQ-101", name: "David Miller", email: "david.m@example.com", branch: "Downtown Ave", status: "Pending", requestedOn: "2026-03-12" },
    { id: "REQ-102", name: "Sarah Connor", email: "s.connor@example.com", branch: "Westside Hub", status: "Pending", requestedOn: "2026-03-14" },
  ]);

  const [activeManagers, setActiveManagers] = useState([
    { id: "MGR-062", name: "Ethan Hunt", email: "ethan@qrave.com", branch: "Uptown Square", status: "Active" },
    { id: "MGR-063", name: "John Wick", email: "j.wick@qrave.com", branch: "Continental", status: "Active" },
  ]);

  const handleApprove = (id) => {
    const request = requests.find(r => r.id === id);
    if (request) {
      setRequests(requests.filter(r => r.id !== id));
      setActiveManagers([...activeManagers, { ...request, id: "MGR-" + Math.floor(Math.random() * 900 + 100), status: "Active" }]);
    }
  };

  const handleDeny = (id) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  const toggleManagerStatus = (id) => {
    setActiveManagers(activeManagers.map(m => m.id === id ? { ...m, status: m.status === "Active" ? "Suspended" : "Active" } : m));
  };

  return (
    <div className="w-full">
      <div className="mb-10">
         <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">Manager <span className="text-red-500">Approvals</span></h1>
         <p className="text-white/50 text-lg">Review and authorize new branch managers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pending Requests */}
        <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#050505]">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Pending Requests
              <span className="bg-red-500/20 text-red-500 text-xs px-2 py-0.5 rounded-full">{requests.length}</span>
            </h2>
          </div>
          
          <div className="p-6 flex-1 space-y-4">
            {requests.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-white/30 py-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <p className="font-bold">No pending requests.</p>
              </div>
            ) : requests.map(req => (
              <div key={req.id} className="bg-[#151515] border border-white/5 p-5 rounded-2xl flex flex-col gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors">{req.name}</h3>
                    <p className="text-sm text-white/50">{req.email}</p>
                  </div>
                  <span className="text-xs font-bold text-white/30">{req.requestedOn}</span>
                </div>
                
                <div className="relative z-10 bg-[#0a0a0a] rounded-lg p-3 text-sm">
                  <span className="text-white/40 uppercase tracking-widest text-[10px] font-bold block mb-1">Requested Branch</span>
                  <span className="text-white bg-white/5 px-2 py-1 rounded inline-block text-xs border border-white/10">{req.branch}</span>
                </div>
                
                <div className="relative z-10 flex gap-3 mt-2">
                  <button onClick={() => handleApprove(req.id)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    Approve
                  </button>
                  <button onClick={() => handleDeny(req.id)} className="flex-1 py-2.5 bg-transparent border border-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Managers */}
        <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#050505]">
            <h2 className="text-xl font-bold">Active Managers</h2>
          </div>
          
          <div className="p-6 flex-1 space-y-3 overflow-y-auto custom-scrollbar">
            {activeManagers.map(mgr => (
              <div key={mgr.id} className="bg-[#151515] border border-white/5 p-4 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center font-bold border border-red-500/20 shrink-0">
                    {mgr.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{mgr.name}</h3>
                    <p className="text-[10px] text-white/50 uppercase tracking-widest">{mgr.branch}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${mgr.status === 'Active' ? 'text-green-500' : 'text-orange-500'}`}>
                    {mgr.status}
                  </span>
                  <button 
                    onClick={() => toggleManagerStatus(mgr.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${mgr.status === 'Active' ? 'border-orange-500/50 text-orange-500 hover:bg-orange-500 hover:text-white' : 'border-green-500/50 text-green-500 hover:bg-green-500 hover:text-white'}`}
                  >
                    {mgr.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
