import axios from "axios";
import { getBackendBaseUrl } from "../utils/fileUrl";

const envApiUrl = import.meta.env.VITE_API_URL;

// Dynamically construct API URL from VITE_API_URL in .env or derived host
const getApiBaseUrl = () => {
  if (envApiUrl) {
    const cleanUrl = envApiUrl.replace(/\/$/, "");
    return cleanUrl.endsWith("/api/v1") ? cleanUrl : `${cleanUrl}/api/v1`;
  }
  const base = getBackendBaseUrl();
  return base ? `${base}/api/v1` : "/api/v1";
};

const API = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

// Request interceptor to attach JWT token if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle unauthenticated 401 errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default API;
