const express = require("express");
const multer = require("multer");
const {
  uploadVideo,
  getVideos,
  getVideoByIdController,
} = require("../controllers/videoController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/video", upload.single("video"), uploadVideo);
router.get("/video", getVideos);
router.get("/video/:id", getVideoByIdController);

module.exports = router;
