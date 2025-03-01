const express = require("express");
const { ideasList, userPosts, createPosts } = require("../controllers/postController");
const { authenticate } = require("../middleware/authMiddleware");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.get("/ideaslist", ideasList);
router.get("/userposts", authenticate, userPosts);
router.post("/createposts", authenticate, upload.single("thumbnail"), createPosts);

module.exports = router;