const router = require("express").Router();
const order = require("../controllers/order.controller");
const authenticate = require("../middleware/authenticate");

router.post("/", order.createOrder);
router.get("/my-orders", order.getUserOrders);
router.patch("/:id/status", order.updateStatus);

module.exports = router;
