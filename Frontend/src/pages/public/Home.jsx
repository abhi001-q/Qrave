import React from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F8F9FA] min-h-screen flex flex-col items-center justify-center font-sans px-4 py-12 background-gradient">
      {/* Header */}
      <header className="text-center mb-12 max-w-2xl">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-[#F2994A] rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
            <span className="text-white text-3xl font-bold -rotate-12">Q</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1B1B1B] mb-4 tracking-tight">
          Welcome to <span className="text-[#F2994A]">Qrave</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Please choose your role to get started with our modern ordering
          experience
        </p>
      </header>
      {/* Role Selection */}
      <main className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Card */}
          <section className="role-card bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center">
            <div className="w-full h-48 mb-8 overflow-hidden rounded-2xl bg-orange-50 flex items-center justify-center">
              <img
                alt="Customer ordering food"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4-hjt6fP2yO54fa1w93on4SFvw8Xi21-SfwKvXknQnc36x5XcJgYanRgtykYQJk9GPH8PJ9CMPk3ct7RVorhogoUNBUwmzItZ0CCY7dLH78Vai2w3uSVGImfXfQSW7h1A0p4tBISCBtztHQn_xZSQfrY3Ws7sFQ9xKgm-lgK5u5yZu97652Er7xWUg9UT11RqR8RFoSSRok6w9KO5ndHJgZON_NfOMEvqZYKLLqUUvd5S0XoVL0RZI3RpgGFjpGBqaXEMjo2pRrY"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#1B1B1B] mb-3">Customer</h2>
            <p className="text-gray-500 mb-8 max-w-xs">
              Explore menus, order your favorites, and enjoy a seamless dining
              or grocery experience.
            </p>
            <button
              className="w-full py-4 px-6 bg-[#F2994A] hover:bg-orange-600 text-white font-bold rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
              onClick={() => navigate("/menu")}
            >
              Continue as Customer
            </button>
          </section>
          {/* Manager Card */}
          <section className="role-card bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col items-center text-center">
            <div className="w-full h-48 mb-8 overflow-hidden rounded-2xl bg-blue-50 flex items-center justify-center">
              <img
                alt="Manager managing restaurant"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYvzajQjWeukiGuQcguOClBMHLsmuEoIJL3ROYdXrjsMpiGZbvN6GsMyhPcKHeo0ONQKVtgp6plgj-ChDN0lmFUGvtGuq855KIopeAcdyW75Ia3B2mN1Z4B-EYJqmX1qRh3rxbflK2601-niPk1AfIMqeFWa8MOa8tBnA4Qe-4fuWzWF-s8K6MfSah_zxKXleeP1nGSaxahOxsX4EuDlMDi6ej05EPqyKfgDAg-kp6PX6-xH_FCHopIBmEYyr32gO57Q3Z17jbZ00"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#1B1B1B] mb-3">Manager</h2>
            <p className="text-gray-500 mb-8 max-w-xs">
              Control your inventory, manage staff, and view real-time analytics
              for your business.
            </p>
            <button
              className="w-full py-4 px-6 bg-[#1B1B1B] hover:bg-black text-white font-bold rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
              onClick={() => navigate("/manager/login")}
            >
              Continue as Manager
            </button>
          </section>
        </div>
      </main>
      {/* Footer */}
      <footer className="mt-16 text-center text-gray-400 text-sm">
        <p>© 2023 Qrave Technologies. All rights reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a className="hover:text-[#F2994A] transition-colors" href="#">
            Help Center
          </a>
          <a className="hover:text-[#F2994A] transition-colors" href="#">
            Terms of Service
          </a>
          <a className="hover:text-[#F2994A] transition-colors" href="#">
            Privacy Policy
          </a>
        </div>
      </footer>
      {/* Custom background gradient */}
      <style>{`
        .background-gradient {
          background: radial-gradient(circle at top right, rgba(242, 153, 74, 0.05), transparent),
                      radial-gradient(circle at bottom left, rgba(45, 156, 219, 0.05), transparent);
        }
        .role-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .role-card:hover {
          transform: translateY(-8px);
        }
      `}</style>
    </div>
  );
}
