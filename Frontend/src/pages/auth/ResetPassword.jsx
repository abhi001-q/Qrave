import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || !password || !confirmPassword) {
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
    <div className="min-h-screen bg-white flex flex-col md:flex-row relative font-sans">
      {/* Left Side: Illustration */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8 lg:p-16 border-b md:border-b-0 md:border-r border-gray-200">
        <div className="w-full max-w-md h-auto aspect-square flex items-center justify-center">
          {/* Placeholder for the sofa/keys illustration */}
          <img
            src="https://illustrations.popsy.co/gray/surreal-hourglass.svg"
            alt="Reset Password Illustration"
            className="w-full h-full object-contain mix-blend-multiply opacity-90"
          />
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 lg:p-16 xl:p-24">
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-black">
            Reset Password
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                className="w-full bg-white text-gray-800 rounded-lg pl-12 pr-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#F97316] transition border border-gray-300"
              />
            </div>

            {/* New Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#F97316]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                aria-label="New Password"
                className="w-full bg-white text-gray-800 rounded-lg pl-12 pr-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#F97316] transition border border-gray-300"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#F97316]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                className="w-full bg-white text-gray-800 rounded-lg pl-12 pr-5 py-4 text-base outline-none focus:ring-2 focus:ring-[#F97316] transition border border-gray-300"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F97316] hover:bg-red-500 disabled:opacity-50 text-white font-medium text-lg py-4 rounded-lg transition cursor-pointer shadow-sm"
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
