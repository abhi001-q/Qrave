import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Tables() {
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [showModal, setShowModal] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [tables, setTables] = useState([
    { id: 1, number: 1, capacity: 2, status: "Available" },
    { id: 2, number: 2, capacity: 4, status: "Occupied" },
    { id: 3, number: 3, capacity: 4, status: "Available" },
    { id: 4, number: 4, capacity: 8, status: "Reserved" },
    { id: 5, number: 5, capacity: 2, status: "Maintenance" },
    { id: 6, number: 6, capacity: 6, status: "Occupied" },
  ]);

  // Simulated Sync with User Table Booking
  React.useEffect(() => {
    const syncBookings = () => {
      const bookings = JSON.parse(localStorage.getItem('table_bookings') || '[]');
      if (bookings.length > 0) {
        setTables(prev => prev.map(table => {
          // If there's a booking for this table number, mark as Reserved
          const isReserved = bookings.some(b => b.tableId === table.number);
          if (isReserved && table.status === "Available") {
            return { ...table, status: "Reserved" };
          }
          return table;
        }));
      }
    };

    const interval = setInterval(syncBookings, 3000); // Check every 3 seconds
    syncBookings(); // Initial check
    return () => clearInterval(interval);
  }, []);

  const [formData, setFormData] = useState({ number: "", capacity: 2, status: "Available" });

  const getStatusStyle = (status) => {
    switch(status) {
      case "Available": return { color: "text-green-600", bg: "bg-green-50", border: "border-green-100" };
      case "Occupied": return { color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" };
      case "Reserved": return { color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" };
      case "Maintenance": return { color: "text-red-600", bg: "bg-red-50", border: "border-red-100" };
      default: return { color: "text-slate-400", bg: "bg-slate-50", border: "border-slate-100" };
    }
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setFormData({ number: tables.length + 1, capacity: 4, status: "Available" });
    setShowModal(true);
  };

  const handleOpenEdit = (table) => {
    setModalMode("edit");
    setEditingTable(table);
    setFormData({ number: table.number, capacity: table.capacity, status: table.status });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this table?")) {
      setTables(tables.filter(t => t.id !== id));
      toast.error("Table removed from floor plan.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "add") {
      const tableId = Date.now();
      setTables([...tables, { id: tableId, ...formData }]);
      toast.success("New table added to live map!");
    } else {
      setTables(tables.map(t => t.id === editingTable.id ? { ...t, ...formData } : t));
      toast.success("Table configuration updated.");
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 flex-shrink-0">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Floor <span className="text-purple-600">Inventory</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Full control over table settings, accessibility, and real-time status.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-[28px] font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 group"
        >
          <span className="material-symbols-outlined transition-transform group-hover:rotate-90">add</span>
          New Table
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 pb-10">
        {tables.map(table => {
          const style = getStatusStyle(table.status);
          return (
            <div key={table.id} className="bg-white border border-slate-100 p-8 rounded-[48px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all flex flex-col items-center group relative overflow-hidden">
               
               {/* Quick Actions */}
               <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 z-20">
                  <button 
                    onClick={() => handleOpenEdit(table)}
                    className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center border border-slate-100"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>
                  <button 
                    onClick={() => handleDelete(table.id)}
                    className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center border border-slate-100"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
               </div>

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

               {/* Booking indicator hint */}
               <div className="mt-8 text-[9px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                  Connected to POS
               </div>
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
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  {modalMode === "add" ? "Expand" : "Configure"} <span className="text-purple-600">Table</span>
                </h2>
                <p className="text-slate-500 font-medium mt-2 text-sm">Update seating capacity and availability parameters.</p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="flex gap-6">
                    <div className="flex-1">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Table Number</label>
                       <input 
                         required 
                         type="number" 
                         value={formData.number}
                         onChange={(e) => setFormData({...formData, number: e.target.value})}
                         className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 text-slate-900 font-black text-2xl transition-all"
                         placeholder="0"
                       />
                    </div>
                    <div className="flex-1">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1 text-right">Capacity</label>
                       <select 
                         value={formData.capacity}
                         onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                         className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 text-slate-900 font-black text-xl transition-all"
                       >
                         {[2, 4, 6, 8, 12].map(c => <option key={c} value={c}>{c} Seats</option>)}
                       </select>
                    </div>
                 </div>

                 <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4 px-1">Global Status Override</label>
                    <div className="grid grid-cols-2 gap-3">
                       {["Available", "Occupied", "Reserved", "Maintenance"].map(status => (
                         <button
                           key={status}
                           type="button"
                           onClick={() => setFormData({...formData, status})}
                           className={`py-4 rounded-2xl flex items-center justify-center font-black text-[10px] uppercase tracking-widest transition-all gap-2 border ${formData.status === status ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 border-slate-900' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 border-slate-100'}`}
                         >
                           <span className={`w-2 h-2 rounded-full ${status === 'Available' ? 'bg-green-500' : status === 'Occupied' ? 'bg-blue-500' : status === 'Reserved' ? 'bg-orange-500' : 'bg-red-500'}`}></span>
                           {status}
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="pt-4">
                    <button 
                      type="submit" 
                      className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-black rounded-3xl font-black text-base uppercase tracking-[0.2em] shadow-2xl shadow-purple-200 hover:shadow-purple-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      {modalMode === "add" ? "Authorize Table" : "Sync Changes"}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
