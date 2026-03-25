import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const StatCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Handle decimal for rating
      if (suffix.includes("/5")) {
        const currentCount = (progress * end).toFixed(1);
        setCount(currentCount);
      } else {
        const currentCount = Math.floor(progress * end);
        setCount(currentCount);
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration, suffix]);

  return (
    <span ref={countRef}>
      {count}
      {suffix}
    </span>
  );
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full bg-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FFF7ED] -z-10 rounded-l-[100px] hidden lg:block"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-bold text-primary uppercase tracking-wider">New: Smart Menu</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-8 tracking-tight">
              Deliciously <span className="text-primary italic">Simple</span>,<br />
              Amazingly Fast.
            </h1>
            
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">
              Manage your entire restaurant ecosystem from a single, beautiful dashboard. Orders, payments, and staff—all synced in real-time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="btn-primary py-4 px-10 text-lg flex items-center justify-center gap-2 shadow-xl shadow-primary/20"
              >
                <span>View Digital Menu</span>
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </Link>
              <Link
                to="/login"
                className="bg-white border-2 border-slate-100 text-slate-700 hover:border-primary hover:text-primary px-10 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 hover:shadow-lg"
              >
                <span>Partner with us</span>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-slate-500">
                Trusted by <span className="text-slate-900">500+</span> restaurants
              </p>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000" 
                alt="Delicious food"
                className="w-full h-auto object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            {/* Floating UI Elements */}
            <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-premium border border-slate-50 z-20 animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Latest Order</p>
                  <p className="text-sm font-extrabold text-slate-900">Pizza Margherita • Rs. 12.99</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-premium border border-slate-50 z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Growth</p>
                  <p className="text-sm font-extrabold text-slate-900">+24% revenue monthly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <h2 className="text-5xl font-black text-primary mb-2">
                <StatCounter end={10} suffix="k+" />
              </h2>
              <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">Orders Daily</p>
            </div>
            <div>
              <h2 className="text-5xl font-black mb-2">
                <StatCounter end={350} suffix="+" />
              </h2>
              <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">Partner Shops</p>
            </div>
            <div>
              <h2 className="text-5xl font-black mb-2">
                <StatCounter end={12} suffix="m" />
              </h2>
              <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">Avg. Delivery</p>
            </div>
            <div>
              <h2 className="text-5xl font-black mb-2">
                <StatCounter end={4.9} suffix="/5" />
              </h2>
              <p className="text-slate-400 font-medium tracking-wide uppercase text-xs">App Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Built for every role.</h2>
            <p className="text-lg text-slate-500">Whether you're ordering a meal or managing a restaurant chain, we've got you covered.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-[#FAFAFA] hover:bg-white border-2 border-transparent hover:border-primary/20 p-10 rounded-[40px] transition-all duration-500 hover:shadow-premium cursor-pointer" onClick={() => navigate("/login")}>
              <div className="w-16 h-16 rounded-3xl bg-orange-50 text-primary flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-4xl">restaurant_menu</span>
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Customer Portal</h3>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                Browse localized menus, track your orders in real-time, and earn rewards on every bite.
              </p>
              <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                <span>Start Ordering</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>

            <div className="group bg-[#FAFAFA] hover:bg-white border-2 border-transparent hover:border-slate-300 p-10 rounded-[40px] transition-all duration-500 hover:shadow-premium cursor-pointer" onClick={() => navigate("/login")}>
              <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-700 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                <span className="material-symbols-outlined text-4xl">dashboard_customize</span>
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-4">Manager Portal</h3>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                Take full control of your kitchen, staff, and inventory with our powerful operational center.
              </p>
              <div className="flex items-center gap-2 text-slate-900 font-bold group-hover:gap-4 transition-all">
                <span>Manage Restaurant</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 mb-32">
        <div className="bg-primary rounded-[60px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-8">Ready to transform your dining?</h2>
            <p className="text-xl text-white/80 mb-12">Join thousands of happy customers and restaurants today.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button onClick={() => navigate("/login")} className="bg-white text-primary px-12 py-5 rounded-full font-black text-xl hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto shadow-xl">
                Get Started Free
              </button>
              <button className="text-white font-bold text-lg hover:underline transition-all">
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
