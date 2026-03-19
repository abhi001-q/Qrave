const router = require("express").Router();
const table = require("../controllers/table.controller");

router.get("/", table.getAll);
router.get("/available", table.getAvailable);

module.exports = router;
