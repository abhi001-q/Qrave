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
      navigate("/reset-password", { state: { email } });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row relative font-sans">
      {/* Left Side: Illustration */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8 lg:p-16 border-b md:border-b-0 md:border-r border-gray-200">
        <div className="w-full max-w-md h-auto aspect-square flex items-center justify-center">
          {/* Placeholder for the sofa/keys illustration */}
          <img
            src="https://illustrations.popsy.co/gray/surreal-hourglass.svg"
            alt="Forgot Password Illustration"
            className="w-full h-full object-contain mix-blend-multiply opacity-90"
          />
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 lg:p-16 xl:p-24">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-black">
            Forget Password
          </h1>
          <p className="text-gray-600 mb-8 text-base">
            Please enter your email address below to receive a verification link
          </p>

          <div className="flex flex-col gap-6">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#F97316]">
                @
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                aria-label="Email Address"
                disabled={otpSent}
                className="w-full bg-white text-gray-800 rounded-lg pl-12 pr-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#F97316] transition border border-gray-300 disabled:opacity-50 disabled:bg-gray-50"
              />
            </div>

            {/* OTP Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#F97316] font-medium text-xs">
                OTP
              </div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
                aria-label="One Time Password"
                disabled={!otpSent}
                className="w-full bg-white text-gray-800 rounded-lg pl-12 pr-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#F97316] transition border border-gray-300 disabled:opacity-50 disabled:bg-gray-50"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4 mt-2">
              <button
                type="button"
                onClick={handleRequestOtp}
                disabled={loading || otpSent}
                className="w-full bg-[#F97316] hover:bg-[#F97316] disabled:opacity-50 text-white font-medium text-lg py-4 rounded-lg transition cursor-pointer shadow-sm"
              >
                {loading && !otpSent ? "Sending..." : "Request OTP"}
              </button>

              <button
                type="button"
                onClick={handleContinue}
                disabled={loading || !otpSent}
                className="w-full bg-[#F97316] hover:bg-[#F97316] disabled:opacity-50 text-white font-medium text-lg py-4 rounded-lg transition cursor-pointer shadow-sm"
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
