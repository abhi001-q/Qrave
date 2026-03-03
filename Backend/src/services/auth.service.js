const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const SALT_ROUNDS = 10;

const authService = {
  async register({ name, email, password, phone, role }) {
    // Check if email already exists
    const existing = await User.findByEmail(email);
    if (existing) {
      const err = new Error("Email already registered");
      err.status = 409;
      throw err;
    }

    // Hash password
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user
    const userId = await User.create({
      name,
      email,
      password: hashed,
      phone,
      role,
    });
    const user = await User.findById(userId);

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" },
    );

    return { user, token };
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
};

module.exports = authService;
