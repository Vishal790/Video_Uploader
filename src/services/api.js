import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/v1";

export const getVideos = async () => {
  const response = await axios.get(`${API_BASE_URL}/video`);
  return response.data;
};


export const uploadVideo = async (file) => {
    const formData = new FormData();
    formData.append("video", file);
    
    const response = await axios.post(`${API_BASE_URL}/video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    
    return response.data;
};

export const getVideoById = async (id) => { 
  const response = await axios.get(`${API_BASE_URL}/video/${id}`);
  return response.data;
};