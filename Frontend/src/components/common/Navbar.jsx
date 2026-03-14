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
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0f0f0f]/80 border-b border-white/5 transition-colors duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black tracking-tighter">
          <span className="text-orange-500">Q</span>
          <span className="text-white">rave</span>
        </Link>
        
        <nav className="hidden md:flex gap-8 items-center text-sm font-medium tracking-wide">
          <Link to="/" className="text-white/70 hover:text-white transition-colors duration-200">Home</Link>
          <Link to="/menu" className="text-white/70 hover:text-white transition-colors duration-200">Digital Menu</Link>
          <Link to="/book-table" className="text-white/70 hover:text-white transition-colors duration-200">Reservations</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative group text-white/80 hover:text-orange-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white text-[10px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center border border-[#0f0f0f]">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          </Link>

          {user ? (
            <div className="relative group ml-4 flex items-center gap-4">
              <Link to="/dashboard" className="text-sm font-semibold text-white hover:text-orange-400">
                {user.name}
              </Link>
              <button 
                onClick={handleLogout}
                className="text-white/50 hover:text-red-400 text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="ml-4 flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-white hover:text-white/80 transition">
                Sign in
              </Link>
              <Link to="/register" className="text-sm font-bold bg-white text-black px-5 py-2 rounded-full hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105">
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
