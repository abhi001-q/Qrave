import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });
  const [regLoading, setRegLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  const handleRegChange = (e) =>
    setRegForm({ ...regForm, [e.target.name]: e.target.value });

  const handleLoginChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.email || !regForm.password) {
      toast.error("Name, email and password are required");
      return;
    }
    setRegLoading(true);
    try {
      const { authService } = await import("../../services/authService");
      const data = await authService.register(regForm);
      // Send OTP to email after registration
      await authService.sendOtp(regForm.email);
      setPendingEmail(regForm.email);
      toast.success("Account created! Please verify OTP sent to your email.");
      navigate("/verify-otp", { state: { email: regForm.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setRegLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoginLoading(true);
    try {
      const user = await login(loginForm);
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "manager") navigate("/manager");
      else navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl text-[#F97316]">
            receipt_long
          </span>
          <span className="font-bold text-xl text-black">Qrave</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm">English</span>
          <button className="bg-[#F97316] text-white px-5 py-2 rounded-lg font-semibold shadow-sm">
            Help
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-row min-h-[calc(100vh-64px)]">
        {/* Left: Register */}
        <section className="w-1/2 flex flex-col justify-center items-center px-16 py-12 bg-white border-r border-gray-100">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-2 text-black">
              Welcome to <span className="text-red-500">Qrave</span>, create
              your account
            </h1>
            <p className="text-gray-500 mb-8">Join our community today.</p>
            <form
              onSubmit={handleRegisterSubmit}
              className="flex flex-col gap-5"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={regForm.name}
                  onChange={handleRegChange}
                  placeholder="Enter your full name"
                  className="w-full bg-[#F6F8FA] text-gray-800 rounded-lg px-5 py-3 text-base outline-none border border-gray-200 focus:ring-2 focus:ring-[#0FAF1A] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={regForm.email}
                  onChange={handleRegChange}
                  placeholder="Enter your email address"
                  className="w-full bg-[#F6F8FA] text-gray-800 rounded-lg px-5 py-3 text-base outline-none border border-gray-200 focus:ring-2 focus:ring-[#0FAF1A] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={regForm.phone}
                  onChange={handleRegChange}
                  placeholder="+977 9810476154"
                  className="w-full bg-[#F6F8FA] text-gray-800 rounded-lg px-5 py-3 text-base outline-none border border-gray-200 focus:ring-2 focus:ring-[#0FAF1A] transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={regForm.password}
                  onChange={handleRegChange}
                  placeholder="Create a strong password"
                  className="w-full bg-[#F6F8FA] text-gray-800 rounded-lg px-5 py-3 text-base outline-none border border-gray-200 focus:ring-2 focus:ring-[#0FAF1A] transition"
                />
              </div>
              <button
                type="submit"
                disabled={regLoading}
                className="w-full bg-[#22C55E] hover:bg-[#16a34a] disabled:opacity-50 text-white font-semibold text-lg py-3 rounded-lg transition mt-2 shadow-sm"
              >
                {regLoading ? "Creating account..." : "Create my account"}
              </button>
            </form>
          </div>
        </section>

        {/* Right: Login */}
        <section className="w-1/2 flex flex-col justify-center items-center px-16 py-12 bg-[#F6F8FA]">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-2 text-black">
              Login your account.
            </h2>
            <p className="text-gray-500 mb-8">
              Welcome back! Please enter your details.
            </p>
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  placeholder="Email address"
                  className="w-full bg-white text-gray-800 rounded-lg px-5 py-3 text-base outline-none border border-gray-200 focus:ring-2 focus:ring-[#F97316] transition"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  placeholder="Password"
                  className="w-full bg-white text-gray-800 rounded-lg px-5 py-3 text-base outline-none border border-gray-200 focus:ring-2 focus:ring-[#F97316] transition pr-12"
                />
                <span className="material-symbols-outlined absolute right-4 top-10 text-gray-400 cursor-pointer select-none">
                  visibility
                </span>
              </div>
              <div className="flex items-center justify-between mt-1 mb-2">
                <label className="flex items-center gap-2 text-gray-500 text-sm">
                  <input type="checkbox" className="accent-[#F97316]" />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-[#F97316] text-sm font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-[#F97316] hover:bg-[#ea6a0a] disabled:opacity-50 text-white font-semibold text-lg py-3 rounded-lg transition shadow-sm"
              >
                {loginLoading ? "Loading..." : "Login"}
              </button>
            </form>
            <div className="flex items-center gap-2 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-xs font-medium">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 bg-white rounded-lg py-3 font-medium text-gray-700 hover:bg-gray-50 transition">
                <img src="/google.svg" alt="Google" className="w-5 h-5" />{" "}
                Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 bg-white rounded-lg py-3 font-medium text-gray-700 hover:bg-gray-50 transition">
                <img src="/facebook.svg" alt="Facebook" className="w-5 h-5" />{" "}
                Facebook
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-between px-8 py-4 border-t border-gray-100 bg-white text-gray-400 text-sm">
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#F97316]">
            Terms of Service
          </a>
          <a href="#" className="hover:text-[#F97316]">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#F97316]">
            Security
          </a>
        </div>
        <div>&copy; 2024 Qrave Inc. All rights reserved.</div>
      </footer>
    </div>
  );
}
