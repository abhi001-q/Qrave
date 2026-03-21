const router = require("express").Router();
const menu = require("../controllers/menu.controller");

router.get("/", menu.getAll);
router.get("/category/:id", menu.getByCategory);
router.get("/:id", menu.getById);

module.exports = router;
