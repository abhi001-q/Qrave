import React, { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    // Simulate fetching overarching system metrics
    setTimeout(() => {
      setMetrics({
        totalUsers: 14205,
        totalManagers: 18,
        activeOrders: 154,
        totalRevenue: 845200.5,
        serverUptime: "99.98%",
        apiLatency: "45ms",
      });
    }, 800);
  }, []);

  if (!metrics) {
    return (
      <div className="w-full flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-12">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-2">
          System <span className="text-red-500">Overview</span>
        </h1>
        <p className="text-white/50 text-lg">
          High-level insights across all restaurants and users.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">
            Total Revenue
          </p>
          <h2 className="text-3xl font-black text-white mb-2">
            ${(metrics.totalRevenue / 1000).toFixed(1)}k
          </h2>
          <span className="text-xs font-bold text-green-500 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            +24.5% (YoY)
          </span>
        </div>

        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">
            Total Users
          </p>
          <h2 className="text-3xl font-black text-white mb-2">
            {metrics.totalUsers.toLocaleString()}
          </h2>
          <span className="text-xs font-bold text-green-500 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            +125 this week
          </span>
        </div>

        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">
            Live Orders
          </p>
          <h2 className="text-3xl font-black text-white mb-2 text-green-500 animate-pulse">
            {metrics.activeOrders}
          </h2>
          <span className="text-xs font-bold text-white/50 flex items-center gap-1">
            Across all branches
          </span>
        </div>

        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -mr-5 -mt-5"></div>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4">
            Staff
          </p>
          <h2 className="text-3xl font-black text-white mb-2">
            {metrics.totalManagers}
          </h2>
          <span className="text-xs font-bold text-white/50 flex items-center gap-1">
            Active Managers
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-6">System Health</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-white/70">
                  Database Uptime
                </span>
                <span className="text-sm font-bold text-green-500">
                  {metrics.serverUptime}
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "99%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-white/70">
                  API Latency
                </span>
                <span className="text-sm font-bold text-yellow-500">
                  {metrics.apiLatency}
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: "35%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-white/70">
                  Storage Capacity
                </span>
                <span className="text-sm font-bold text-red-500">82%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: "82%" }}
                ></div>
              </div>
              <p className="text-[10px] text-red-500 mt-2 font-bold uppercase tracking-widest">
                Warning: Expanding soon
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-6">Recent Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  Database Backup Failed
                </p>
                <p className="text-xs text-white/50 mt-1">
                  Automatic nightly backup encountered an error at 03:00 AM.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  New Manager Registration
                </p>
                <p className="text-xs text-white/50 mt-1">
                  2 new manager accounts pending approval in the queue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
