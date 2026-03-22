const router = require("express").Router();
const userController = require("../controllers/user.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// Protected Manager Routes for Staff Management
router.get("/staff", authenticate, authorize("MANAGER", "ADMIN"), userController.getStaff);
router.post("/staff", authenticate, authorize("MANAGER", "ADMIN"), userController.addStaff);
router.patch("/staff/:id/status", authenticate, authorize("MANAGER", "ADMIN"), userController.toggleStatus);
router.delete("/staff/:id", authenticate, authorize("MANAGER", "ADMIN"), userController.deleteStaff);

module.exports = router;
