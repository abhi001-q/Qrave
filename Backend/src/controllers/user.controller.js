const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { sendSuccess, sendError } = require("../utils/apiResponse");

exports.getStaff = async (req, res) => {
  try {
    const staff = await User.findAllStaff();
    sendSuccess(res, 200, staff);
  } catch (err) {
    console.error(err);
    sendError(res, 500, err.message);
  }
};

exports.addStaff = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return sendError(res, 400, "All fields are required");
    }

    const existing = await User.findByEmail(email);
    if (existing) {
      return sendError(res, 409, "Email already exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    const userId = await User.create({
      name,
      email,
      password: hashed,
      phone: null,
      role
    });

    const newStaff = await User.findById(userId);
    newStaff.status = newStaff.is_active ? "Active" : "Inactive";
    sendSuccess(res, 201, newStaff, "Staff member added");
  } catch (err) {
    console.error(err);
    sendError(res, 500, err.message);
  }
};

exports.toggleStatus = async (req, res) => {
  try {
    const { status } = req.body; // Expects "Active" or "Inactive"
    const isActive = status === "Active";
    await User.updateStatus(req.params.id, isActive);
    sendSuccess(res, 200, null, "Status updated");
  } catch (err) {
    console.error(err);
    sendError(res, 500, err.message);
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    await User.delete(req.params.id);
    sendSuccess(res, 200, null, "Staff member deleted");
  } catch (err) {
    console.error(err);
    sendError(res, 500, err.message);
  }
};
