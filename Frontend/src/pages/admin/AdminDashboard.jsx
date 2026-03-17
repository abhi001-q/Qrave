import { useAuth } from "../../hooks/useAuth";

export default function AdminDashboard() {
  const { user } = useAuth();
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">
              dashboard_customize
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Qrave
          </h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-semibold"
            href="#"
          >
            <span className="material-symbols-outlined">grid_view</span>
            <span>Overview</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">group</span>
            <span>Manage User</span>
          </a>
          <a
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="#"
          >
            <span className="material-symbols-outlined">rule_folder</span>
            <span>Manage Approval</span>
          </a>
        </nav>
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2">
            <div
              className="size-10 rounded-full bg-slate-200 dark:bg-slate-700"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0QVQv3VESyIbzWQTzjlSjdewLlHnMTyKa_bxVnzxr0QmLHSSFCXaFW5tMpqdbduk8K86VetDjDPNvKKXYMKnE8jBL8hKS1l7YHHxoXFnL9gPe10FEtMrNgbZcGSFLehrDEu8ZU0xR5nTnnFX02IDtw0b3tttXEi1Y7FpUehsQf8IAaVwqnGf9fnL8c4o76glG1CQcTdOnroGlHasc9oC3ZCYLRl3QRFHWc9kebbpPwQBOSoxzlR7MckNKMpvJ3vABsFyTforw41c')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate">Admin User</span>
              <span className="text-xs text-slate-500">Manager Dashboard</span>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark flex items-center justify-between px-8">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                placeholder="Search analytics or users..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 relative text-slate-600 dark:text-slate-400">
              <span className="material-symbols-outlined text-2xl">
                notifications
              </span>
              <span className="absolute top-2 right-2 size-2 bg-primary rounded-full border-2 border-white dark:border-background-dark"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
              <span className="material-symbols-outlined text-2xl">
                settings
              </span>
            </button>
          </div>
        </header>
        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50 dark:bg-slate-900/20">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Title Section */}
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight">
                Dashboard Overview
              </h1>
              <p className="text-slate-500 text-sm">
                Welcome back, manager. Here's what's happening today.
              </p>
            </div>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Total Manager
                  </p>
                  <p className="text-3xl font-bold mt-1">2</p>
                </div>
                <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    manage_accounts
                  </span>
                </div>
              </div>
              <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold mt-1">3</p>
                </div>
                <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    groups
                  </span>
                </div>
              </div>
              <div className="bg-white dark:bg-background-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm border-l-4 border-l-primary">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Pending Approval
                  </p>
                  <p className="text-3xl font-bold mt-1">2</p>
                </div>
                <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    pending_actions
                  </span>
                </div>
              </div>
            </div>
            {/* Two-column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity Section */}
              <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold text-lg">Recent Activity</h3>
                  <span className="material-symbols-outlined text-slate-400">
                    history
                  </span>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                        <span className="material-symbols-outlined">
                          person_add
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">New User Registered</p>
                        <p className="text-xs text-slate-400">
                          Since last 24 hours
                        </p>
                      </div>
                    </div>
                    <span className="text-xl font-bold">0</span>
                  </div>
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                        <span className="material-symbols-outlined">
                          how_to_reg
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">Active User</p>
                        <p className="text-xs text-slate-400">
                          Currently logged in
                        </p>
                      </div>
                    </div>
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                        <span className="material-symbols-outlined">
                          person_off
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">Inactive User</p>
                        <p className="text-xs text-slate-400">
                          No activity for 30 days
                        </p>
                      </div>
                    </div>
                    <span className="text-xl font-bold">3</span>
                  </div>
                </div>
              </div>
              {/* System Status Section */}
              <div className="bg-white dark:bg-background-dark rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="font-bold text-lg">System Status</h3>
                  <span className="material-symbols-outlined text-slate-400">
                    dns
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-400">
                        database
                      </span>
                      <span className="font-medium">Database</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-900/50 flex items-center gap-1">
                      <span className="size-1.5 bg-green-600 rounded-full"></span>
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-400">
                        folder_zip
                      </span>
                      <span className="font-medium">File Storage</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-900/50 flex items-center gap-1">
                      <span className="size-1.5 bg-green-600 rounded-full"></span>
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-400">
                        api
                      </span>
                      <span className="font-medium">API Services</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-900/50 flex items-center gap-1">
                      <span className="size-1.5 bg-green-600 rounded-full"></span>
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-400">
                        lock
                      </span>
                      <span className="font-medium">User Authentication</span>
                    </div>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-900/50 flex items-center gap-1">
                      <span className="size-1.5 bg-green-600 rounded-full"></span>
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
