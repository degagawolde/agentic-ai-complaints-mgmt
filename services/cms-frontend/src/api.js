import axios from "axios";

export const API = axios.create({
    baseURL: "http://localhost:8000", // change to your backend URL
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const registerUser = (data) => API.post("/auth/register/", data);
export const loginUser = (data) => API.post("/auth/login/", data);

// Complaint endpoints
export const submitComplaint = (data) => API.post("/cms/complaint/submissions/", data);