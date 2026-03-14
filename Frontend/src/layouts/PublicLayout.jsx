import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f0f0f] text-white selection:bg-orange-500 selection:text-white">
      <Navbar />
      <main className="flex-grow flex flex-col w-full relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
