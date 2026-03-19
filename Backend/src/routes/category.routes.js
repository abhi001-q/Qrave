const router = require("express").Router();
const category = require("../controllers/category.controller");

router.get("/", category.getAll);

module.exports = router;
