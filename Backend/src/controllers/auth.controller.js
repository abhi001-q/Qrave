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
