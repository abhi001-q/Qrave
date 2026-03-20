import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaSnapchatGhost } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-24 pb-12 text-white overflow-hidden relative">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 relative z-10">
        <div className="md:col-span-4 space-y-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2.5 rounded-2xl shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-3xl">restaurant</span>
            </div>
            <span className="text-3xl font-black text-white tracking-tight">Qrave</span>
          </Link>
          <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
            Revolutionizing the restaurant experience with seamless digital orchestration and delightful dining.
          </p>
          <div className="flex gap-4">
            {[
              { icon: <FaFacebookF />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
              { icon: <FaWhatsapp />, link: "#" },
              { icon: <FaSnapchatGhost />, link: "#" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all duration-300"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-8">
            Experience
          </h4>
          <ul className="space-y-4 text-base font-bold text-slate-300">
            <li><Link to="/menu" className="hover:text-primary transition-colors">Our Menu</Link></li>
            <li><Link to="/book-table" className="hover:text-primary transition-colors">Reservations</Link></li>
            <li><Link to="/login" className="hover:text-primary transition-colors">Order Tracker</Link></li>
            <li><Link to="/offers" className="hover:text-primary transition-colors">Daily Offers</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-8">
            Company
          </h4>
          <ul className="space-y-4 text-base font-bold text-slate-300">
            <li><Link to="#" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Partner With Us</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Careers</Link></li>
            <li><Link to="#" className="hover:text-primary transition-colors">Help Center</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-8">
            Get Updates
          </h4>
          <p className="text-slate-400 mb-6 font-medium">
            Join our mailing list for exclusive restaurant deals and culinary news.
          </p>
          <div className="flex bg-slate-800  rounded-2xl border border-slate-700 p-1.5 focus-within:border-primary transition-colors group">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent border-none text-sm w-full px-4 text-white placeholder:text-slate-600 outline-none focus:outline-none focus:ring-0 focus:border-none"
            />
            <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-[14px] font-bold text-sm transition-all shadow-lg active:scale-95">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-24 pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-sm font-bold text-slate-500 gap-6">
        <p>© {new Date().getFullYear()} Qrave Inc. Crafted with passion for food lovers.</p>
        <div className="flex space-x-8">
          <Link to="#" className="hover:text-white transition-colors tracking-wide">Privacy</Link>
          <Link to="#" className="hover:text-white transition-colors tracking-wide">Terms</Link>
          <Link to="#" className="hover:text-white transition-colors tracking-wide">Security</Link>
        </div>
      </div>
    </footer>
  );
}
