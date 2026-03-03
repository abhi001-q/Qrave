import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error("Name, email and password are required");
      return;
    }

    setLoading(true);
    try {
      const { authService } = await import("../../services/authService");
      const data = await authService.register(form);

      // Auto-login after register
      localStorage.setItem("qrave_user", JSON.stringify(data.user));
      localStorage.setItem("qrave_token", data.token);

      toast.success(`Welcome, ${data.user.name}! Account created.`);

      // Redirect based on role
      if (data.user.role === "admin") navigate("/admin");
      else if (data.user.role === "manager") navigate("/manager");
      else navigate("/dashboard");

      // Force page reload to sync auth context
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      value: "user",
      label: "Customer",
      desc: "Browse menu, place orders",
      color: "border-blue-500/30 bg-blue-500/5",
    },
    {
      value: "manager",
      label: "Manager",
      desc: "Manage products & orders",
      color: "border-orange-500/30 bg-orange-500/5",
    },
    {
      value: "admin",
      label: "Admin",
      desc: "Full system access",
      color: "border-red-500/30 bg-red-500/5",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Join <span className="text-orange-500">Qrave</span>
          </h1>
          <p className="text-white/50 text-center text-sm mb-8">
            Create your account
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-white/50 mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-orange-500 transition"
              />
            </div>

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

            <div>
              <label className="text-xs text-white/50 mb-1 block">
                Phone (optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-orange-500 transition"
              />
            </div>

            {/* Role selector */}
            <div>
              <label className="text-xs text-white/50 mb-2 block">
                Select Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: r.value })}
                    className={`border rounded-lg p-3 text-center transition cursor-pointer ${
                      form.role === r.value
                        ? r.color + " border-current"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <p className="text-sm font-medium">{r.label}</p>
                    <p className="text-[10px] text-white/40 mt-0.5">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition mt-2 cursor-pointer"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-400 hover:text-orange-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
