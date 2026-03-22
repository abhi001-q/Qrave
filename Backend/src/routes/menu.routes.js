const router = require("express").Router();
const menu = require("../controllers/menu.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

router.get("/", menu.getAll);
router.get("/category/:id", menu.getByCategory);
router.get("/:id", menu.getById);

// Protected Manager Routes
router.post("/", authenticate, authorize("MANAGER", "ADMIN"), menu.create);
router.put("/:id", authenticate, authorize("MANAGER", "ADMIN"), menu.update);
router.delete("/:id", authenticate, authorize("MANAGER", "ADMIN"), menu.remove);

module.exports = router;
