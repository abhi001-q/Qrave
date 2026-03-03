import { useAuth } from "../../hooks/useAuth";

export default function ManagerDashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Manager Dashboard</h1>
      <p className="text-white/50">
        Welcome, {user?.name}. Management tools coming soon.
      </p>
    </div>
  );
}
