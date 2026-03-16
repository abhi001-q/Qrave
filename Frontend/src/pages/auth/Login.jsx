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
    role: "manager",
  });
  const [regLoading, setRegLoading] = useState(false);

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
      localStorage.setItem("qrave_user", JSON.stringify(data.user));
      localStorage.setItem("qrave_token", data.token);
      toast.success(`Welcome, ${data.user.name}! Account created.`);
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
    /* ── Fixed desktop layout: always side-by-side, no responsive prefixes ── */
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "row", position: "relative" }}
      className="bg-white font-sans"
    >
      {/* OR Divider — always visible at center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
        className="bg-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-[#0FAF1A] shadow-md border border-gray-100"
      >
        OR
      </div>

      {/* Left panel: Register */}
      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
          borderRight: "1px solid #e5e7eb",
        }}
        className="bg-white"
      >
        <div style={{ width: "100%", maxWidth: "440px" }}>
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
              aria-label="Full Name"
              className="w-full bg-[#EBEBEB] text-gray-800 rounded-lg px-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition"
            />
            <input
              type="email"
              name="email"
              value={regForm.email}
              onChange={handleRegChange}
              placeholder="Email"
              aria-label="Email Address"
              className="w-full bg-[#EBEBEB] text-gray-800 rounded-lg px-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition"
            />
            <input
              type="tel"
              name="phone"
              value={regForm.phone}
              onChange={handleRegChange}
              placeholder="Mobile Number"
              aria-label="Mobile Number"
              className="w-full bg-[#EBEBEB] text-gray-800 rounded-lg px-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition"
            />
            <input
              type="password"
              name="password"
              value={regForm.password}
              onChange={handleRegChange}
              placeholder="Password"
              aria-label="Password"
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

      {/* Right panel: Login */}
      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
        }}
        className="bg-[#EBEBEB]"
      >
        <div style={{ width: "100%", maxWidth: "440px" }}>
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
              aria-label="Email Address"
              className="w-full bg-white text-gray-800 rounded-lg px-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition"
            />
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              placeholder="Password"
              aria-label="Password"
              className="w-full bg-white text-gray-800 rounded-lg px-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition"
            />
            <div className="flex gap-4 mt-2">
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
