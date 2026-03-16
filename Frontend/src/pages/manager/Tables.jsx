import React, { useState } from "react";

export default function Tables() {
  const [tables, setTables] = useState([
    { id: 1, number: 1, capacity: 2, status: "Available" },
    { id: 2, number: 2, capacity: 4, status: "Occupied" },
    { id: 3, number: 3, capacity: 4, status: "Available" },
    { id: 4, number: 4, capacity: 8, status: "Reserved" },
    { id: 5, number: 5, capacity: 2, status: "Maintenance" },
    { id: 6, number: 6, capacity: 6, status: "Occupied" },
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case "Available": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "Occupied": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "Reserved": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "Maintenance": return "bg-red-500/10 text-red-500 border-red-500/20";
      default: return "bg-white/5 text-white/40 border-white/10";
    }
  };

  return (
    <div className="w-full">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
           <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">Manage <span className="text-purple-500">Tables</span></h1>
           <p className="text-white/50 text-lg">Live overview of dining capacities and availability.</p>
        </div>
        <button 
          className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Add Table
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {tables.map(table => (
          <div key={table.id} className="bg-[#111] border border-white/5 p-6 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${table.status === 'Available' ? 'bg-green-500/5' : table.status === 'Occupied' ? 'bg-blue-500/5' : table.status === 'Reserved' ? 'bg-orange-500/5' : 'bg-red-500/5'}`}></div>
            
            <div className="relative z-10 w-20 h-20 mb-4 border-4 border-[#050505] shadow-lg rounded-full flex items-center justify-center bg-gradient-to-tr from-[#151515] to-[#222]">
               <span className="text-2xl font-black">{table.number}</span>
            </div>
            
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest mb-3 ${getStatusColor(table.status)} relative z-10`}>
              {table.status}
            </div>
            
            <span className="text-white/40 text-sm font-medium relative z-10 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              {table.capacity} Seats
            </span>
            
            {table.status === "Available" && (
              <div className="absolute top-4 right-4 text-white/20 hover:text-white cursor-pointer z-10" title="Generate QR Code">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
