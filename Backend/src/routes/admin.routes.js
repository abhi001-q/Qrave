const router = require("express").Router();
const adminController = require("../controllers/admin.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

router.get("/metrics", authenticate, authorize("ADMIN"), adminController.getDashboardStats);

module.exports = router;
