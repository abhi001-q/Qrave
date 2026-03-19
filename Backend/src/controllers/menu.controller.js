const Product = require("../models/product.model");
const { sendSuccess, sendError } = require("../utils/apiResponse");

exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    sendSuccess(res, 200, products);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const products = await Product.findByCategory(req.params.id);
    sendSuccess(res, 200, products);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return sendError(res, 404, "Product not found");
    sendSuccess(res, 200, product);
  } catch (err) {
    sendError(res, 500, err.message);
  }
};
