import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const otp = location.state?.otp || "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword: password,
      });
      toast.success("Password changed successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* ── Fixed desktop layout: no responsive breakpoints ── */
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "row" }}
      className="bg-white font-sans"
    >
      {/* Left Side: Illustration */}
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
        <div style={{ width: "100%", maxWidth: "400px", aspectRatio: "1/1" }}>
          <img
            src="https://illustrations.popsy.co/gray/surreal-hourglass.svg"
            alt="Reset Password Illustration"
            style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply", opacity: 0.9 }}
          />
        </div>
      </div>

      {/* Right Side: Form */}
      <div
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px",
        }}
        className="bg-white"
      >
        <div style={{ width: "100%", maxWidth: "440px" }}>
          <h1 className="text-3xl font-bold mb-10 text-black">
            Reset Password
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* New Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#0FAF1A]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                aria-label="New Password"
                className="w-full bg-white text-gray-800 rounded-lg pl-12 pr-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition border border-gray-300"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#0FAF1A]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                className="w-full bg-white text-gray-800 rounded-lg pl-12 pr-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition border border-gray-300"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#4CAF50] hover:bg-[#43a047] disabled:opacity-50 text-white font-medium text-lg py-4 rounded-lg transition cursor-pointer shadow-sm"
              >
                {loading ? "Updating..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
