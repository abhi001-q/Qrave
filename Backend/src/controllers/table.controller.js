const Table = require("../models/table.model");
const { sendSuccess, sendError } = require("../utils/apiResponse");

exports.getAll = async (req, res) => {
  try {
    const tables = await Table.findAll();
    sendSuccess(res, 200, tables);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

exports.getAvailable = async (req, res) => {
  try {
    const tables = await Table.findAvailable();
    sendSuccess(res, 200, tables);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};
