const authService = require("../services/auth.service");
const { sendSuccess, sendError } = require("../utils/apiResponse");

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 400, "Name, email and password are required");
    }

    const data = await authService.register({
      name,
      email,
      password,
      phone,
      role,
    });
    sendSuccess(res, 201, data, "Registration successful");
  } catch (err) {
    sendError(res, err.status || 500, err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, "Email and password are required");
    }

    const data = await authService.login({ email, password });
    sendSuccess(res, 200, data, "Login successful");
  } catch (err) {
    sendError(res, err.status || 500, err.message);
  }
};

exports.me = async (req, res) => {
  try {
    const User = require("../models/user.model");
    const user = await User.findById(req.user.id);
    if (!user) return sendError(res, 404, "User not found");
    sendSuccess(res, 200, user);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

// ── OTP Password Reset ─────────────────────────────
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return sendError(res, 400, "Email is required");
    await authService.forgotPassword(email);
    sendSuccess(res, 200, null, "OTP sent to your email");
  } catch (err) {
    // Log the full error for debugging
    console.error("Forgot Password Error:", err);
    sendError(res, err.status || 500, err.message || err.toString());
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return sendError(res, 400, "Email and OTP are required");
    const valid = await authService.verifyOtp(email, otp);
    if (!valid) return sendError(res, 400, "Invalid or expired OTP");
    sendSuccess(res, 200, null, "OTP verified");
  } catch (err) {
    sendError(res, err.status || 500, err.message);
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword)
      return sendError(res, 400, "All fields required");
    await authService.resetPassword(email, otp, newPassword);
    sendSuccess(res, 200, null, "Password reset successful");
  } catch (err) {
    sendError(res, err.status || 500, err.message);
  }
};
