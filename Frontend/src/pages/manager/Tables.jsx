import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Tables() {
  const [showModal, setShowModal] = useState(false);
  const [tables, setTables] = useState([
    { id: 1, number: 1, capacity: 2, status: "Available", color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
    { id: 2, number: 2, capacity: 4, status: "Occupied", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
    { id: 3, number: 3, capacity: 4, status: "Available", color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
    { id: 4, number: 4, capacity: 8, status: "Reserved", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
    { id: 5, number: 5, capacity: 2, status: "Maintenance", color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
    { id: 6, number: 6, capacity: 6, status: "Occupied", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  ]);

  const [newTable, setNewTable] = useState({ number: "", capacity: 2 });

  const getStatusColor = (status) => {
    switch(status) {
      case "Available": return { color: "text-green-600", bg: "bg-green-50", border: "border-green-100" };
      case "Occupied": return { color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" };
      case "Reserved": return { color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" };
      case "Maintenance": return { color: "text-red-600", bg: "bg-red-50", border: "border-red-100" };
      default: return { color: "text-slate-400", bg: "bg-slate-50", border: "border-slate-100" };
    }
  };

  const handleAddTable = (e) => {
    e.preventDefault();
    const tableId = Date.now();
    const style = getStatusColor("Available");
    setTables([...tables, { id: tableId, number: parseInt(newTable.number), capacity: newTable.capacity, status: "Available", ...style }]);
    setShowModal(false);
    setNewTable({ number: "", capacity: 2 });
    toast.success("New table added successfully!");
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 flex-shrink-0">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Floor <span className="text-purple-600">Map</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Coordinate dining capacities and real-time seat availability.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-[28px] font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 group"
        >
          <span className="material-symbols-outlined transition-transform group-hover:rotate-90">add</span>
          Add Table
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 pb-10">
        {tables.map(table => {
          const style = getStatusColor(table.status);
          return (
            <div key={table.id} className="bg-white border border-slate-100 p-8 rounded-[48px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col items-center group relative overflow-hidden">
               
               {/* Decorative background circle */}
               <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity ${style.bg}`}></div>
               
               <div className={`relative z-10 w-24 h-24 mb-6 rounded-full flex items-center justify-center bg-white border-4 ${style.border} shadow-2xl shadow-slate-100 transition-transform group-hover:scale-110`}>
                  <div className={`w-16 h-16 rounded-full ${style.bg} flex items-center justify-center font-black text-2xl ${style.color}`}>
                     {table.number}
                  </div>
               </div>
               
               <div className={`px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border mb-6 ${style.bg} ${style.color} ${style.border} relative z-10`}>
                 {table.status}
               </div>
               
               <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl relative z-10 group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                  <span className="material-symbols-outlined text-sm text-slate-400">group</span>
                  <span className="text-xs font-black text-slate-700 tracking-tight">{table.capacity} <span className="text-[10px] text-slate-400 uppercase tracking-widest ml-0.5 font-bold">Seats</span></span>
               </div>

               {/* QR Shortcut */}
               <button className="mt-8 text-slate-300 hover:text-purple-600 transition-colors relative z-10" title="Manage QR Menu">
                  <span className="material-symbols-outlined text-xl">qr_code_2</span>
               </button>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white rounded-[48px] p-12 w-full max-w-md shadow-2xl relative border border-white/20 animate-in zoom-in-95 duration-500">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-10 right-10 w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center justify-center"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <header className="mb-10 text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Expand <span className="text-purple-600">Capacity</span></h2>
                <p className="text-slate-500 font-medium mt-2 text-sm">Designate new seating for your floor plan.</p>
              </header>

              <form onSubmit={handleAddTable} className="space-y-8">
                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1 text-center">Table Number</label>
                    <input 
                      required 
                      type="number" 
                      value={newTable.number}
                      onChange={(e) => setNewTable({...newTable, number: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-8 py-5 outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 text-slate-900 font-black text-center text-4xl transition-all"
                      placeholder="0"
                    />
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4 px-1 text-center">Capacity (Seats)</label>
                    <div className="flex items-center justify-center gap-6">
                       {[2, 4, 6, 8].map(cap => (
                         <button
                           key={cap}
                           type="button"
                           onClick={() => setNewTable({...newTable, capacity: cap})}
                           className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm transition-all ${newTable.capacity === cap ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-100'}`}
                         >
                           {cap}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="pt-4">
                    <button 
                      type="submit" 
                      className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl font-black text-base uppercase tracking-[0.2em] shadow-2xl shadow-purple-200 hover:shadow-purple-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Authorize Table
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
