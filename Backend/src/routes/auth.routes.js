const router = require("express").Router();
const auth = require("../controllers/auth.controller");
const authenticate = require("../middleware/authenticate");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/me", authenticate, auth.me);

module.exports = router;
