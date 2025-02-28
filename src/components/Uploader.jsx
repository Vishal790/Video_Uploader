import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { uploadVideo } from "../services/api";
import { toast } from "react-hot-toast";

const Uploader = ({ setVideos }) => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const onDropRejected = useCallback(() => {
    toast.error("Invalid file type. Please upload a video.");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "video/mp4": [".mp4"],
      "video/webm": [".webm"],
      "video/ogg": [".ogg"],
    },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const toastId = toast.loading("Uploading video...");
    try {
      const uploadedVideo = await uploadVideo(file);
      setVideos((prev) => [uploadedVideo, ...prev]);
      toast.success("Upload successful!", { id: toastId });
      setFile(null);
    } catch (error) {
      toast.error("Upload failed. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-2xl shadow-xl flex flex-col items-center w-full max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4 text-blue-400">
        Upload Your Video
      </h1>

      <div
        {...getRootProps()}
        className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
          isDragActive ? "border-blue-500 bg-gray-800" : "border-gray-500"
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-blue-400 text-4xl mb-2">⬆</div>
        <p className="text-gray-300">
          {isDragActive ? "Drop the file here..." : "Click or drag file here"}
        </p>
      </div>

      {file && <p className="mt-3 text-sm text-gray-300">{file.name}</p>}

      <button
        onClick={handleUpload}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md w-full"
      >
        Upload Video
      </button>
    </div>
  );
};

export default Uploader;
