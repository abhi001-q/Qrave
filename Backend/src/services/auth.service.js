const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const SALT_ROUNDS = 10;

const authService = {
  async register({ name, email, password, phone, role }) {
    // Check if email already exists
    const existing = await User.findByEmail(email);
    if (existing) {
      if (existing.is_active) {
        const err = new Error("Email already registered");
        err.status = 409;
        throw err;
      }
      // If user exists but not active, we just update their password/name and send a new OTP
      const hashed = await bcrypt.hash(password, SALT_ROUNDS);
      await User.updatePassword(email, hashed);
      // Fall through to OTP generation
    } else {
      // Hash password
      const hashed = await bcrypt.hash(password, SALT_ROUNDS);

      // Create user
      await User.create({
        name,
        email,
        password: hashed,
        phone,
        role,
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await User.setOTP(email, otp, expires);

    // Send email
    const sendEmail = require("../utils/sendEmail");
    await sendEmail({
      to: email,
      subject: "Qrave Verification OTP",
      text: `Your verification code is ${otp}. It expires in 10 minutes.`,
      html: `<p>Your verification code is <b>${otp}</b>. It expires in 10 minutes.</p>`,
    });

    return { message: "OTP sent for verification" };
  },

  async login({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      throw err;
    }

    if (!user.is_active) {
      const err = new Error("Account is deactivated");
      err.status = 403;
      throw err;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      throw err;
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    );

    // Remove password from response
    const { password: _, ...safeUser } = user;

    return { user: safeUser, token };
  },

  // ── OTP Password Reset ─────────────────────────────
  async forgotPassword(email) {
    const user = await User.findByEmail(email);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await User.setOTP(email, otp, expires);
    // Send email
    const sendEmail = require("../utils/sendEmail");
    await sendEmail({
      to: email,
      subject: "Qrave Password Reset OTP",
      text: `Your OTP is ${otp}. It expires in 10 minutes.`,
      html: `<p>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</p>`,
    });
  },

  async verifyOtp(email, otp) {
    const isValid = await User.verifyOTP(email, otp);
    if (!isValid) return null;

    const user = await User.findByEmail(email);
    if (!user) return null;

    // Activate user after verification
    await User.updateStatus(user.id, true);
    await User.clearOTP(email);

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    );

    // Remove password from response
    const { password: _, ...safeUser } = user;
    return { user: { ...safeUser, is_active: 1 }, token };
  },

  async resetPassword(email, otp, newPassword) {
    const valid = await User.verifyOTP(email, otp);
    if (!valid) {
      const err = new Error("Invalid or expired OTP");
      err.status = 400;
      throw err;
    }
    const hashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await User.updatePassword(email, hashed);
    await User.clearOTP(email);
  },
};

module.exports = authService;
