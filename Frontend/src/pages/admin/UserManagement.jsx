import React, { useState } from "react";

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: "USR-001", name: "Alice Smith", email: "alice@example.com", status: "Active", joined: "2025-10-12" },
    { id: "USR-002", name: "Bob Johnson", email: "bob@example.com", status: "Active", joined: "2025-11-05" },
    { id: "USR-003", name: "Charlie Davis", email: "charlie@example.com", status: "Banned", joined: "2026-01-20" },
    { id: "USR-004", name: "Diana Prince", email: "diana@example.com", status: "Active", joined: "2026-02-14" },
  ]);

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Banned" : "Active" } : u));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
        <div>
           <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">User <span className="text-red-500">Directory</span></h1>
           <p className="text-white/50 text-lg">Manage all customer accounts across the platform.</p>
        </div>
        
        <div className="w-full sm:w-auto relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input 
            type="text" 
            placeholder="Search users..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 bg-[#111] border border-white/10 rounded-full pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
          />
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-[#050505] border-b border-white/10 text-[10px] uppercase tracking-widest text-white/40 font-black">
                <th className="p-6">User ID</th>
                <th className="p-6">Full Name</th>
                <th className="p-6">Email Contact</th>
                <th className="p-6">Joined Date</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-white/30 font-bold">No users match your search.</td>
                </tr>
              ) : filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-6 font-bold text-white/50 text-sm">{user.id}</td>
                  <td className="p-6 font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white/80">
                      {user.name.charAt(0)}
                    </div>
                    {user.name}
                  </td>
                  <td className="p-6 text-white/70 text-sm">{user.email}</td>
                  <td className="p-6 text-white/50 text-sm">{new Date(user.joined).toLocaleDateString()}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${user.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => toggleStatus(user.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${user.status === 'Active' ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-white/10 text-white hover:bg-white hover:text-black'}`}
                    >
                      {user.status === 'Active' ? 'Ban User' : 'Unban'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
