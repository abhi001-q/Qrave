import { useAuth } from "../../hooks/useAuth";

export default function UserDashboard() {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name} 👋</h1>
      <p className="text-white/50">
        This is your customer dashboard. Features coming soon.
      </p>
    </div>
  );
}
