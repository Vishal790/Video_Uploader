const cloudinary = require('cloudinary').v2;
const { db } = require("../config/firebase");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");


const uploadAndCompressVideo = async (file) => {
  const outputPath = `uploads/compressed_${file.filename}.mp4`;

  await new Promise((resolve, reject) => {
    ffmpeg(file.path)
      .output(outputPath)
      .videoCodec("libx264")
      .size("720x?")
      .on("end", resolve)
      .on("error", reject)
      .run();
  });

  const uploadResult = await cloudinary.uploader.upload(outputPath, {
    resource_type: "video",
    folder: "Video_Uploader",
  });

  fs.unlinkSync(file.path);
  fs.unlinkSync(outputPath);

  return uploadResult;
};




const saveVideoMetadata = async (metadata) => {
  const videoRef = db.collection("videos").doc();
  await videoRef.set(metadata);
  return videoRef.id;
};

const getAllVideos = async () => {
  const snapshot = await db.collection("videos").get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const getVideoById = async (videoId) => {
  const videoRef = db.collection("videos").doc(videoId);
  const videoDoc = await videoRef.get();

  if (!videoDoc.exists) {
    return null;
  }

  return { id: videoDoc.id, ...videoDoc.data() };
};

module.exports = {
  uploadAndCompressVideo,
  saveVideoMetadata,
  getAllVideos,
  getVideoById,
};
