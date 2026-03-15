import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white text-black">
      <main>
        <Outlet />
      </main>
    </div>
  );
}
