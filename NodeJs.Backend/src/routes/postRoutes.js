const express = require("express");
const { ideasList, userPosts } = require("../controllers/postController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/ideaslist", ideasList);
router.get("/userposts", authenticate, userPosts); 

module.exports = router;
