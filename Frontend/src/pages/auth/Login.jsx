import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("user"); // "user" or "manager"

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        // Registration Logic
        if (!formData.name || !formData.email || !formData.password) {
          toast.error("Please fill all required fields");
          setLoading(false);
          return;
        }

        const { authService } = await import("../../services/authService");
        await authService.register({ ...formData, role });
        await authService.sendOtp(formData.email);

        toast.success("Account created! Please verify OTP sent to your email.");
        navigate("/verify-otp", { state: { email: formData.email } });
      } else {
        // Login Logic
        if (!formData.email || !formData.password) {
          toast.error("Please fill all fields");
          setLoading(false);
          return;
        }

        const user = await login({
          email: formData.email,
          password: formData.password,
        });
        toast.success(`Welcome back, ${user.name}!`);

        if (user.role === "admin") navigate("/admin");
        else if (user.role === "manager" || user.role === "staff") navigate("/manager");
        else navigate("/dashboard");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          (isRegister ? "Registration failed" : "Login failed"),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
      {/* Visual Side (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-[#FFF7ED] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-200/20 rounded-full -ml-40 -mb-40 blur-3xl"></div>

        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-white text-3xl">
                restaurant
              </span>
            </div>
            <span className="text-3xl font-bold text-slate-900 tracking-tight">
              Qrave
            </span>
          </div>

          <h1 className="text-5xl font-extrabold text-slate-900 leading-[1.1] mb-6">
            Everything you need for your{" "}
            <span className="text-primary">restaurant.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-10">
            Streamline your orders, manage your kitchen, and delight your
            customers with the most intuitive platform.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
              <h3 className="font-bold text-slate-900 mb-1">99.9%</h3>
              <p className="text-sm text-slate-500">Service Uptime</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100">
              <h3 className="font-bold text-slate-900 mb-1">24/7</h3>
              <p className="text-sm text-slate-500">Premium Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center gap-2 mb-8 justify-center">
            <span className="material-symbols-outlined text-primary text-4xl">
              restaurant
            </span>
            <span className="text-2xl font-bold">Qrave</span>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {isRegister ? "Create an account" : "Welcome back"}
            </h2>
            <p className="text-slate-500">
              {isRegister
                ? "Join hundreds of restaurant owners today."
                : "Enter your credentials to access your dashboard."}
            </p>
          </div>

          {/* Toggle between Login and Register */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
            <button
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${!isRegister ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${isRegister ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-5">
            {isRegister && (
              <>
                {/* Role Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700 block">
                    I am a...
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRole("user")}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${role === "user" ? "border-primary bg-orange-50/50 text-primary" : "border-slate-100 text-slate-500 hover:border-slate-200"}`}
                    >
                      <span className="material-symbols-outlined mb-2">
                        person
                      </span>
                      <span className="text-sm font-bold">Customer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("manager")}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${role === "manager" ? "border-primary bg-orange-50/50 text-primary" : "border-slate-100 text-slate-500 hover:border-slate-200"}`}
                    >
                      <span className="material-symbols-outlined mb-2">
                        storefront
                      </span>
                      <span className="text-sm font-bold">Manager</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="input-field"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@email.com"
                className="input-field"
                required
              />
            </div>

            {isRegister && (
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-1.5 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+977 98XXXXXXX"
                  className="input-field"
                />
              </div>
            )}

            <div className="relative">
              <div className="flex justify-between items-center mb-1.5 px-0.5">
                <label className="text-sm font-semibold text-slate-700 block">
                  Password
                </label>
                {!isRegister && (
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs font-bold text-primary hover:underline transition-all"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : (
                <span>{isRegister ? "Create Account" : "Sign In"}</span>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            By continuing, you agree to our{" "}
            <a
              href="#"
              className="underline font-medium hover:text-slate-700 transition-colors"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline font-medium hover:text-slate-700 transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
