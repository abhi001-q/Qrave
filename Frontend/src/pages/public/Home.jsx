import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <h1 className="text-5xl sm:text-6xl font-bold mb-6">
        Dine Smart with <span className="text-orange-500">Qrave</span>
      </h1>
      <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10">
        Browse menus, place orders, book tables — all from your phone. The
        modern restaurant experience.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link
          to="/menu"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          View Menu
        </Link>
        <Link
          to="/register"
          className="border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
