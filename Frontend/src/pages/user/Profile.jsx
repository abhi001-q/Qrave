import { useAuth } from "../../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-w-md">
        <p className="text-sm text-white/50 mb-1">Name</p>
        <p className="font-medium mb-3">{user?.name}</p>
        <p className="text-sm text-white/50 mb-1">Email</p>
        <p className="font-medium mb-3">{user?.email}</p>
        <p className="text-sm text-white/50 mb-1">Role</p>
        <p className="font-medium capitalize">{user?.role}</p>
      </div>
    </div>
  );
}
