const Category = require("../models/category.model");
const { sendSuccess, sendError } = require("../utils/apiResponse");

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    sendSuccess(res, 200, categories);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};
