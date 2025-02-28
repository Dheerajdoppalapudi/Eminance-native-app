const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const { register, login, userProfile, updateUserProfile } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", register);
router.post("/token", login);
router.get("/user", authenticate, userProfile);
router.put("/user/update", authenticate, updateUserProfile);

module.exports = router;