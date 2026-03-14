import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 text-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link to="/" className="text-3xl font-black tracking-tighter">
            <span className="text-orange-500">Q</span>
            <span className="text-white">rave</span>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            A premium digital dining experience. Redefining how you order, pay, and savor the moments.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 tracking-wide text-white/90">Experience</h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li><Link to="/menu" className="hover:text-orange-400 transition">Digital Menu</Link></li>
            <li><Link to="/book-table" className="hover:text-orange-400 transition">Reservations</Link></li>
            <li><Link to="/login" className="hover:text-orange-400 transition">Member Login</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 tracking-wide text-white/90">Company</h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li><Link to="#" className="hover:text-orange-400 transition">Our Story</Link></li>
            <li><Link to="#" className="hover:text-orange-400 transition">Careers</Link></li>
            <li><Link to="#" className="hover:text-orange-400 transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 tracking-wide text-white/90">Newsletter</h4>
          <p className="text-sm text-white/50 mb-4">Stay updated with our latest exclusive offers.</p>
          <div className="flex bg-[#111] rounded-full overflow-hidden border border-white/10 p-1">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent text-sm w-full outline-none px-4 text-white placeholder:text-white/30"
            />
            <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-white/30">
        <p>© {new Date().getFullYear()} Qrave Technologies. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="#" className="hover:text-white transition">Privacy Policy</Link>
          <Link to="#" className="hover:text-white transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
