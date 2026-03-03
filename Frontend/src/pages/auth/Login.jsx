import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const user = await login(form);
      toast.success(`Welcome back, ${user.name}!`);

      // Redirect based on role
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "manager") navigate("/manager");
      else navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Welcome to <span className="text-orange-500">Qrave</span>
          </h1>
          <p className="text-white/50 text-center text-sm mb-8">
            Sign in to your account
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-white/50 mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-orange-500 transition"
              />
            </div>

            <div>
              <label className="text-xs text-white/50 mb-1 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-orange-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition mt-2 cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-400 hover:text-orange-300"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo credentials card */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
            Demo Accounts
          </h3>
          <div className="grid gap-2 text-xs">
            <DemoCred
              role="Admin"
              email="admin@qrave.com"
              color="text-red-400"
            />
            <DemoCred
              role="Manager"
              email="manager@qrave.com"
              color="text-orange-400"
            />
            <DemoCred
              role="User"
              email="user@qrave.com"
              color="text-blue-400"
            />
          </div>
          <p className="text-[11px] text-white/30 mt-2">
            Password for all: <code className="text-white/50">password123</code>
          </p>
        </div>
      </div>
    </div>
  );
}

function DemoCred({ role, email, color }) {
  return (
    <div className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
      <span className={`font-medium ${color}`}>{role}</span>
      <span className="text-white/50">{email}</span>
    </div>
  );
}
