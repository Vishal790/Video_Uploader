const {
  uploadAndCompressVideo,
  saveVideoMetadata,
  getAllVideos,
  getVideoById,
} = require("../services/videoService");

const uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const uploadResult = await uploadAndCompressVideo(req.file);

    const videoMetadata = {
      originalName: req.file.originalname,
      originalSize: `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`,
      compressedSize: `${(uploadResult.bytes / (1024 * 1024)).toFixed(2)} MB`,
      format: req.file.mimetype.split("/")[1],
      uploadedAt: new Date().toISOString(),
      downloadUrl: uploadResult.secure_url,
    };

    const videoId = await saveVideoMetadata(videoMetadata);
    res.status(201).json({ id: videoId, ...videoMetadata });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error uploading video", details: error.message });
  }
};

const getVideos = async (req, res) => {
  try {
    const videos = await getAllVideos();
    res.status(200).json(videos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching videos", details: error.message });
  }
};

const getVideoByIdController = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await getVideoById(videoId);

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching video metadata", details: error.message });
  }
};

module.exports = { uploadVideo, getVideos, getVideoByIdController };
