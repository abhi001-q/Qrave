import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Staff() {
  const [showModal, setShowModal] = useState(false);
  const [staff, setStaff] = useState([
    { id: 1, name: "Alexander Pierce", role: "Head Chef", email: "alex@qrave.com", status: "Active", initials: "AP", color: "bg-purple-600" },
    { id: 2, name: "Sarah Jenkins", role: "General Manager", email: "sarah@qrave.com", status: "Active", initials: "SJ", color: "bg-blue-600" },
    { id: 3, name: "Marcus Thorne", role: "Senior Server", email: "marcus@qrave.com", status: "Active", initials: "MT", color: "bg-green-600" },
    { id: 4, name: "Elena Rossi", role: "Waitstaff", email: "elena@qrave.com", status: "Inactive", initials: "ER", color: "bg-orange-600" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Waitstaff",
  });

  const roles = ["General Manager", "Head Chef", "Senior Server", "Waitstaff", "Bartender"];

  const handleSave = (e) => {
    e.preventDefault();
    const newMember = {
      id: Date.now(),
      ...formData,
      status: "Active",
      initials: formData.name.split(" ").map(n => n[0]).join("").toUpperCase(),
      color: "bg-indigo-600"
    };
    setStaff([newMember, ...staff]);
    setShowModal(false);
    setFormData({ name: "", email: "", password: "", role: "Waitstaff" });
    toast.success("Staff member invited successfully!");
  };

  const toggleStatus = (id) => {
    setStaff(staff.map(mem => mem.id === id ? { ...mem, status: mem.status === "Active" ? "Inactive" : "Active" } : mem));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Team <span className="text-purple-600">Operations</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Manage workforce roles, permissions, and status.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-8 py-4 bg-purple-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-purple-700 transition-all shadow-xl shadow-purple-200 active:scale-95 group"
        >
          <span className="material-symbols-outlined transition-transform group-hover:rotate-90">add</span>
          Invite Staff
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
             <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                   <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Team Member</th>
                   <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Designated Role</th>
                   <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Status</th>
                   <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Access Control</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-50">
                {staff.map((member) => (
                   <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-8">
                         <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl ${member.color} text-white flex items-center justify-center font-black text-sm shadow-xl shadow-slate-100 group-hover:scale-110 transition-transform`}>
                               {member.initials}
                            </div>
                            <div>
                               <h3 className="font-black text-slate-900 group-hover:text-purple-600 transition-colors">{member.name}</h3>
                               <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-widest">{member.email}</p>
                            </div>
                         </div>
                      </td>
                      <td className="p-8 text-center">
                         <span className="px-4 py-1.5 bg-slate-50 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest border border-slate-100">
                            {member.role}
                         </span>
                      </td>
                      <td className="p-8 text-center text-sm font-bold text-slate-500">
                         <button 
                          onClick={() => toggleStatus(member.id)}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                            member.status === 'Active' 
                              ? 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100/50' 
                              : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100/50'
                          }`}
                         >
                            <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-slate-300'}`}></span>
                            {member.status}
                         </button>
                      </td>
                      <td className="p-8 text-right">
                         <div className="flex items-center justify-end gap-3 px-2">
                            <button className="w-10 h-10 rounded-xl bg-white text-slate-400 border border-slate-100 hover:text-purple-600 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-100 transition-all flex items-center justify-center group/btn">
                               <span className="material-symbols-outlined text-xl group-hover/btn:scale-110 transition-transform">edit_note</span>
                            </button>
                            <button className="w-10 h-10 rounded-xl bg-white text-slate-400 border border-slate-100 hover:text-red-500 hover:border-red-200 hover:shadow-lg hover:shadow-red-100 transition-all flex items-center justify-center group/btn">
                               <span className="material-symbols-outlined text-xl group-hover/btn:rotate-12 transition-transform shadow-red-50">delete_outline</span>
                            </button>
                         </div>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[48px] p-12 w-full max-w-lg shadow-2xl relative border border-white/20 animate-in zoom-in-95 duration-500">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-10 right-10 w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center justify-center"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <header className="mb-10 text-center">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Staff <span className="text-purple-600">Onboarding</span></h2>
              <p className="text-slate-500 font-medium mt-2">Grant access to high-performance management tools.</p>
            </header>

            <form onSubmit={handleSave} className="space-y-6 font-sans">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 text-slate-900 font-bold transition-all"
                  placeholder="Alexander Pierce"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Email Address</label>
                <input 
                  required 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 text-slate-900 font-bold transition-all"
                  placeholder="name@qrave.com"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Initial Password</label>
                <input 
                  required 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 text-slate-900 font-bold transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 px-1">Assigned Role</label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-3xl px-6 py-4 outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-200 text-slate-900 font-bold transition-all appearance-none"
                >
                  {roles.map(role => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl font-black text-base uppercase tracking-[0.2em] shadow-2xl shadow-purple-200 hover:shadow-purple-300 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  Authorize Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
