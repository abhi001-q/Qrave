import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header 
      className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-500 ${
        isScrolled 
          ? "bg-white/95 py-2 shadow-lg shadow-slate-200/50 border-b border-slate-100" 
          : "bg-white/80 py-4 border-b border-transparent"
      }`}
    >
      <div className={`container mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
        isScrolled ? "h-14" : "h-20"
      }`}>
        <Link to="/" className="flex items-center gap-2 group">
          <div className={`bg-primary p-2 rounded-xl group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-primary/20 ${
            isScrolled ? "scale-90" : "scale-100"
          }`}>
            <span className="material-symbols-outlined text-white text-2xl">
              restaurant
            </span>
          </div>
          <span className={`font-black text-slate-900 tracking-tight transition-all duration-500 ${
            isScrolled ? "text-xl" : "text-2xl"
          }`}>
            Qrave
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/cart"
            className="relative group p-2 text-slate-600 hover:text-primary transition-all rounded-xl hover:bg-orange-50"
          >
            <span className="material-symbols-outlined text-2xl">
              shopping_cart
            </span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to={
                  user.role === "admin"
                    ? "/admin"
                    : user.role === "manager"
                      ? "/manager"
                      : "/dashboard"
                }
                className="flex items-center gap-3 group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                    Welcome,
                  </p>
                  <p className="text-sm font-extrabold text-slate-900 group-hover:text-primary transition-colors">
                    {user.name}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-primary font-bold group-hover:scale-110 transition-transform">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-red-500 transition-all rounded-xl hover:bg-red-50"
                title="Logout"
              >
                <span className="material-symbols-outlined text-2xl font-bold">
                  logout
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-bold text-slate-600 hover:text-primary transition-colors px-4 py-2"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="btn-primary py-2.5 px-6 text-sm shadow-lg shadow-primary/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
