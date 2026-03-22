const Product = require("../models/product.model");
const Category = require("../models/category.model");
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

exports.create = async (req, res) => {
  try {
    const { title, description, price, category, image, status } = req.body;
    
    let category_id = null;
    if (category) {
      let catRow = await Category.findByName(category);
      if (!catRow) {
        const insertId = await Category.create({ name: category, image: null, description: null });
        catRow = { id: insertId };
      }
      category_id = catRow.id;
    }

    const productId = await Product.create({
      title, description, price, category_id, image, status
    });
    
    const newProduct = await Product.findById(productId);
    sendSuccess(res, 201, newProduct, "Product created");
  } catch (err) {
    console.error(err);
    sendError(res, 500, err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { title, description, price, category, image, status } = req.body;
    let category_id = null;
    if (category) {
      let catRow = await Category.findByName(category);
      if (!catRow) {
        const insertId = await Category.create({ name: category, image: null, description: null });
        catRow = { id: insertId };
      }
      category_id = catRow.id;
    }
    
    await Product.update(req.params.id, {
      title, description, price, category_id, image, status
    });
    
    const updatedProduct = await Product.findById(req.params.id);
    sendSuccess(res, 200, updatedProduct, "Product updated");
  } catch (err) {
    console.error(err);
    sendError(res, 500, err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    await Product.delete(req.params.id);
    sendSuccess(res, 200, null, "Product deleted");
  } catch (err) {
    console.error(err);
    sendError(res, 500, err.message);
  }
};
