import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-full relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center max-w-5xl mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 mb-8 mx-auto">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-sm font-semibold text-orange-400 tracking-wide uppercase">The Future of Dining</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
            Taste <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Excellence</span> <br className="hidden md:block" />
            Without the Wait.
          </h1>
          
          <p className="text-xl md:text-2xl text-white/50 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Experience seamless digital ordering, instant payments, and unparalleled service orchestration. Welcome to Qrave.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/menu" 
              className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105"
            >
              Explore Digital Menu
            </Link>
            <Link 
              to="/book-table" 
              className="w-full sm:w-auto px-10 py-5 bg-black border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-colors"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid based on Excalidraw requirements */}
      <section className="py-24 bg-[#050505] relative z-10 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Redefined Experience</h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">Everything you need for a frictionless dining journey, right at your fingertips.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-10 hover:border-orange-500/30 transition-colors group cursor-pointer" onClick={() => navigate('/menu')}>
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-8 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Digital Menu</h3>
              <p className="text-white/50 leading-relaxed font-light">Browse visually stunning interactive menus and place orders instantly without waiting for a server.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-10 hover:border-blue-500/30 transition-colors group cursor-pointer" onClick={() => navigate('/book-table')}>
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Table Reservations</h3>
              <p className="text-white/50 leading-relaxed font-light">Secure your spot for parties, romantic dinners, or casual meetups with our live booking system.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-10 hover:border-green-500/30 transition-colors group cursor-pointer" onClick={() => navigate('/dashboard')}>
               <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 mb-8 group-hover:scale-110 transition-transform">
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
               </div>
              <h3 className="text-2xl font-bold mb-4">Instant Digital Bills</h3>
              <p className="text-white/50 leading-relaxed font-light">Pay directly from your phone (cash or online) and instantly generate downloadable PDF invoices.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
