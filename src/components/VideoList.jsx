import { Link } from "react-router-dom";

const VideoList = ({ videos }) => {
  return (
    <div className="mt-6 w-full max-w-md ">
      <h2 className="text-lg text-white mb-2 font-bold items-center">
        Uploaded Videos
      </h2>
      {
       videos && videos.length? <ul className="space-y-2 max-h-72 overflow-y-auto bg-slate-800 px-3">
          {videos.map((video) => (
            <li
              key={video.id}
              className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
            >
              <Link to={`/video/${video.id}`} className="text-white">
                {video.originalName}
              </Link>
            </li>
          ))}
        </ul>: <p className="text-white">No videos uploaded yet.</p>
      }
    </div>
  );
};

export default VideoList;
