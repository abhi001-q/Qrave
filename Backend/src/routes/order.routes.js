const router = require("express").Router();
const order = require("../controllers/order.controller");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

// Using optional authentication middleware is better, but let's stick to what we have
router.post("/", order.createOrder); 
router.get("/my-orders", authenticate, order.getUserOrders);
router.get("/all", authenticate, authorize("MANAGER", "ADMIN"), order.getAllOrders);
router.get("/:id", authenticate, order.getOrderById);
router.patch("/:id/status", order.updateStatus); 
router.patch("/:id/transaction", order.updateTransactionId);

module.exports = router;
