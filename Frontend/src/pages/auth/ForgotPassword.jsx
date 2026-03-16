import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequestOtp = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/forgot-password", { email });
      setOtpSent(true);
      toast.success("OTP sent to your email!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/verify-otp", { email, otp });
      toast.success("OTP verified!");
      navigate("/reset-password", { state: { email, otp } });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again.",
      );
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
            alt="Forgot Password Illustration"
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
          <h1 className="text-3xl font-bold mb-4 text-black">
            Forget Password
          </h1>
          <p className="text-gray-600 mb-8 text-base">
            Please enter your email address below to receive a verification link
          </p>

          <div className="flex flex-col gap-6">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#0FAF1A]">
                @
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                aria-label="Email Address"
                disabled={otpSent}
                className="w-full bg-white text-gray-800 rounded-lg pl-12 pr-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition border border-gray-300 disabled:opacity-50 disabled:bg-gray-50"
              />
            </div>

            {/* OTP Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#0FAF1A] font-medium text-xs">
                OTP
              </div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
                aria-label="One Time Password"
                disabled={!otpSent}
                className="w-full bg-white text-gray-800 rounded-lg pl-12 pr-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#0FAF1A] transition border border-gray-300 disabled:opacity-50 disabled:bg-gray-50"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 mt-2">
              <button
                type="button"
                onClick={handleRequestOtp}
                disabled={loading || otpSent}
                className="w-full bg-[#4CAF50] hover:bg-[#43a047] disabled:opacity-50 text-white font-medium text-lg py-4 rounded-lg transition cursor-pointer shadow-sm"
              >
                {loading && !otpSent ? "Sending..." : "Request OTP"}
              </button>

              <button
                type="button"
                onClick={handleContinue}
                disabled={loading || !otpSent}
                className="w-full bg-[#4CAF50] hover:bg-[#43a047] disabled:opacity-50 text-white font-medium text-lg py-4 rounded-lg transition cursor-pointer shadow-sm"
              >
                {loading && otpSent ? "Verifying..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
