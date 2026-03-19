import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-slate-100 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-white text-2xl">restaurant</span>
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">Qrave</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-10 items-center">
          <Link to="/" className="text-slate-600 hover:text-primary font-bold text-sm transition-colors uppercase tracking-wider">Home</Link>
          <Link to="/menu" className="text-slate-600 hover:text-primary font-bold text-sm transition-colors uppercase tracking-wider">Digital Menu</Link>
          <Link to="/book-table" className="text-slate-600 hover:text-primary font-bold text-sm transition-colors uppercase tracking-wider">Reservations</Link>
        </nav>

        <div className="flex items-center gap-6">
          <Link
            to="/cart"
            className="relative group p-2 text-slate-600 hover:text-primary transition-all rounded-xl hover:bg-orange-50"
          >
            <span className="material-symbols-outlined text-2xl">shopping_cart</span>
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
                to={user.role === 'admin' ? '/admin' : user.role === 'manager' ? '/manager' : '/dashboard'}
                className="flex items-center gap-3 group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Welcome,</p>
                  <p className="text-sm font-extrabold text-slate-900 group-hover:text-primary transition-colors">{user.name}</p>
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
                <span className="material-symbols-outlined text-2xl font-bold">logout</span>
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
