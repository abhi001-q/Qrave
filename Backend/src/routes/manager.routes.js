const router = require("express").Router();
const managerController = require("../controllers/manager.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

router.get("/analytics", authenticate, authorize("MANAGER", "ADMIN"), managerController.getAnalytics);

module.exports = router;
