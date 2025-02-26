import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVideoById } from "../services/api";
import ReactPlayer from "react-player";
import { saveAs } from "file-saver";
import { FaPlay, FaPause } from "react-icons/fa";

const Video = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const fetchVideo = async () => {
      const data = await getVideoById(id);
      setVideo(data);
    };
    fetchVideo();
  }, [id]);

  if (!video) return <p className="text-white">Loading...</p>;

  return (
    <div className="p-6 bg-gray-800 rounded-lg w-full max-w-2xl mx-auto text-white">
      <h1 className="text-xl font-semibold text-blue-400 mb-4">
        {video.originalName}
      </h1>

      <div className=" flex items-center justify-center relative">
        <ReactPlayer
          url={video.downloadUrl}
          controls
          playing={playing}
             
        />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            className="pointer-events-auto bg-black bg-opacity-50 rounded-full p-4 hover:bg-opacity-70 transition duration-300"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? (
              <FaPause className="text-white text-4xl" />
            ) : (
              <FaPlay className="text-white text-4xl" />
            )}
          </button>
        </div>
      </div>

      {/* Video Details */}
      <div className="mt-4">
        <p>
          <strong>Format:</strong> {video.format}
        </p>
        <p>
          <strong>Original Size:</strong> {video.originalSize}
        </p>
        <p>
          <strong>Compressed Size:</strong> {video.compressedSize}
        </p>
        <p>
          <strong>Uploaded At:</strong>{" "}
          {new Date(video.uploadedAt).toLocaleString()}
        </p>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => saveAs(video.downloadUrl, video.originalName)}
        >
          ⬇ Download
        </button>
      </div>
    </div>
  );
};

export default Video;
