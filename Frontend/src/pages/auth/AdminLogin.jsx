import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function AdminLogin() {
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
      
      if (user.role !== "admin") {
        toast.error("Access denied: Not an administrator");
        return;
      }
      
      toast.success(`Welcome back, Admin ${user.name}!`);
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EBEBEB] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-2 text-black">
          Qrave <span className="text-[#F97316]">Admin</span>
        </h1>
        <p className="text-gray-500 text-center text-sm mb-8">
          Authorized personnel only
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block uppercase tracking-wider">
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="admin@qrave.com"
              aria-label="Admin Email Address"
              className="w-full bg-[#EBEBEB] text-gray-800 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F97316] transition"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              aria-label="Admin Password"
              className="w-full bg-[#EBEBEB] text-gray-800 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#F97316] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#F97316] hover:bg-[#F97316] disabled:opacity-50 text-white font-medium py-3 rounded-lg transition mt-4 cursor-pointer shadow-sm"
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
