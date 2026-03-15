import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Registration state
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "manager", // Default role since user directly goes to menu
  });
  const [regLoading, setRegLoading] = useState(false);

  // Login state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);

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

      // Auto-login after register
      localStorage.setItem("qrave_user", JSON.stringify(data.user));
      localStorage.setItem("qrave_token", data.token);

      toast.success(`Welcome, ${data.user.name}! Account created.`);

      // Redirect based on role
      if (data.user.role === "manager") navigate("/manager");
      else navigate("/dashboard");

      window.location.reload();
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

      // Redirect based on role
      // Admin handles their own login route, but if admin logs in here by mistake, redirect them
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
    <div className="min-h-screen bg-white flex flex-col md:flex-row relative font-sans">
      {/* Absolute OR Divider */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-12 h-12 flex flex-col items-center justify-center font-bold text-[#0FAF1A] shadow-md z-10 hidden md:flex border border-gray-100">
        OR
      </div>

      {/* Left side: Register */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 lg:p-16 xl:p-24">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold mb-1 text-black">
            Welcome to <span className="text-[#0FAF1A]">Qrave</span>,
          </h1>
          <h2 className="text-3xl font-bold mb-8 text-black">
            create your account
          </h2>

          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              value={regForm.name}
              onChange={handleRegChange}
              placeholder="Full Name"
              className="w-full bg-[#EBEBEB] text-gray-800 rounded-lg px-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition"
            />
            <input
              type="email"
              name="email"
              value={regForm.email}
              onChange={handleRegChange}
              placeholder="Email"
              className="w-full bg-[#EBEBEB] text-gray-800 rounded-lg px-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition"
            />
            <input
              type="tel"
              name="phone"
              value={regForm.phone}
              onChange={handleRegChange}
              placeholder="Mobile Number"
              className="w-full bg-[#EBEBEB] text-gray-800 rounded-lg px-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition"
            />
            <input
              type="password"
              name="password"
              value={regForm.password}
              onChange={handleRegChange}
              placeholder="Password"
              className="w-full bg-[#EBEBEB] text-gray-800 rounded-lg px-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition"
            />

            <button
              type="submit"
              disabled={regLoading}
              className="w-full bg-[#0FAF1A] hover:bg-[#0c9616] disabled:opacity-50 text-white font-medium text-lg py-4 rounded-lg transition mt-2 cursor-pointer shadow-sm"
            >
              {regLoading ? "Creating account..." : "Create my account"}
            </button>
          </form>
        </div>
      </div>

      {/* Right side: Login */}
      <div className="w-full md:w-1/2 bg-[#EBEBEB] flex flex-col justify-center p-8 lg:p-16 xl:p-24 relative border-t md:border-t-0 border-[#0FAF1A]/20">
        {/* Mobile OR Divider */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-10 h-10 flex flex-col items-center justify-center font-bold text-[#0FAF1A] shadow-md z-10 md:hidden border border-gray-100 text-sm">
          OR
        </div>

        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-black">
            Login your account.
          </h2>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              placeholder="Email"
              className="w-full bg-white text-gray-800 rounded-lg px-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition"
            />
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              placeholder="Password"
              className="w-full bg-white text-gray-800 rounded-lg px-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition"
            />

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button
                type="submit"
                disabled={loginLoading}
                className="flex-1 bg-[#0FAF1A] hover:bg-[#0c9616] disabled:opacity-50 text-white font-medium text-lg py-4 rounded-lg transition cursor-pointer shadow-sm"
              >
                {loginLoading ? "Loading..." : "Login"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="flex-[1.5] bg-[#0FAF1A] hover:bg-[#0c9616] text-white font-medium text-lg py-4 rounded-lg transition cursor-pointer shadow-sm"
              >
                Forgot Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
