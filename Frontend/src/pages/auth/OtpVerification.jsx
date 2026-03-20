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

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      document.getElementById(`otp-input-${idx - 1}`).focus();
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
    <div className="min-h-screen bg-white flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-12 group"
        >
          <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          <span className="text-sm font-semibold tracking-wide uppercase">
            Back to Login
          </span>
        </button>

        <div className="text-center md:text-left mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 text-primary mb-6">
            <span className="material-symbols-outlined text-3xl">
              mark_email_read
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Check your email
          </h1>
          <p className="text-slate-500 text-lg max-w-md">
            We've sent a 6-digit verification code to{" "}
            <span className="text-slate-900 font-semibold">
              {email || "your email"}
            </span>
            .
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div
            className="grid grid-cols-6 gap-3 md:gap-4"
            onPaste={handlePaste}
          >
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-full h-16 md:h-20 text-3xl font-bold text-center bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all"
                autoFocus={idx === 0}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={verifying}
              className="btn-primary w-full py-4 text-lg"
            >
              {verifying ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify Code"
              )}
            </button>

            <div className="flex items-center justify-between px-2 text-sm">
              <div className="flex items-center gap-2 text-slate-500 font-medium font-mono bg-slate-100 px-3 py-1.5 rounded-full">
                <span className="material-symbols-outlined text-base">
                  schedule
                </span>
                <span>{`0${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, "0")}`}</span>
              </div>

              <div className="text-slate-500">
                Didn't receive it?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timer > 0}
                  className={`font-bold transition-colors ${timer > 0 ? "text-slate-300 pointer-events-none" : "text-primary hover:text-primary-hover underline"}`}
                >
                  Resend Code
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="mt-16 bg-slate-50 rounded-2xl p-6 border border-slate-100">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-slate-400">
              help_outline
            </span>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                Need help?
              </h4>
              <p className="text-sm text-slate-500">
                Check your spam folder or contact our support team if you're
                having trouble receiving the code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
