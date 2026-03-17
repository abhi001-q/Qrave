import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(119); // 1:59 in seconds
  const [verifying, setVerifying] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    // Move to next input
    if (value && idx < 5) {
      document.getElementById(`otp-input-${idx + 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (paste.length === 6) {
      setOtp(paste.split(""));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Missing email context for OTP verification.");
      return;
    }
    setVerifying(true);
    try {
      const { authService } = await import("../../services/authService");
      const code = otp.join("");
      await authService.verifyOtp(email, code);
      toast.success("OTP verified! Account activated.");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setTimer(119);
    try {
      const { authService } = await import("../../services/authService");
      await authService.sendOtp(email);
      toast.success("OTP resent to your email.");
    } catch (err) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAFA]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center">
        <div className="mb-6">
          <div className="flex items-center justify-center mb-2">
            <span className="material-symbols-outlined text-4xl text-[#F97316] bg-[#FFF3E6] rounded-full p-2">
              mail
            </span>
          </div>
          <h2 className="text-2xl font-bold text-center mb-1">
            Verify Your Email
          </h2>
          <p className="text-center text-gray-600 text-base mb-2">
            We've sent a 6-digit verification code to{" "}
            <b>{email || "your email"}</b>.
            <br />
            Please enter it below to continue.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-6"
        >
          <div className="flex gap-3 justify-center mb-2" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                className="w-12 h-14 text-2xl text-center border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F97316] outline-none bg-[#FAFAFA]"
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-[#F97316] hover:bg-[#ea6a0a] text-white font-semibold text-lg py-3 rounded-lg transition shadow-md"
          >
            Verify Code
          </button>
        </form>
        <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-sm">
          <span className="material-symbols-outlined text-base">schedule</span>
          <span>{`0${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`}</span>
        </div>
        <div className="mt-2 text-center text-sm">
          Didn't receive the code?{" "}
          <button
            onClick={handleResend}
            className="text-[#F97316] font-medium hover:underline"
            disabled={timer > 0}
          >
            Resend Code
          </button>
        </div>
        <div className="w-full border-t border-gray-100 mt-6 pt-4 text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-gray-500 hover:text-[#F97316] text-sm"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
