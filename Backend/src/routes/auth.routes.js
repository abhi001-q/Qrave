const router = require("express").Router();
const auth = require("../controllers/auth.controller");
const authenticate = require("../middleware/authenticate");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/me", authenticate, auth.me);

// OTP Password Reset
router.post("/forgot-password", auth.forgotPassword);
router.post("/verify-otp", auth.verifyOtp);
router.post("/reset-password", auth.resetPassword);

module.exports = router;
