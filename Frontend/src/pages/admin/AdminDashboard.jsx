import { useAuth } from "../../hooks/useAuth";

export default function AdminDashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-white/50">
        Welcome, {user?.name}. Admin tools coming soon.
      </p>
    </div>
  );
}
