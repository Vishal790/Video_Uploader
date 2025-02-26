import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Uploader from "./components/Uploader";
import VideoList from "./components/VideoList";
import Video from "./pages/Video";
import { getVideos } from "./services/api";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getVideos();
      console.log("videos", data);
      setVideos(data);
    };
    fetchVideos();
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-900 text-white flex flex-col">
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col">
              <div className="p-6">
                <Uploader setVideos={setVideos} />
              </div>

              <div className="flex justify-center items-center overflow-auto p-6">
                <VideoList videos={videos} />
              </div>
            </div>
          }
        />

        <Route path="/video/:id" element={<Video />} />
      </Routes>
    </div>
  );
}

export default App;
