import axios from "axios";
import { parse } from "cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  // 서버사이드
  if (typeof window === "undefined" && config.headers) {
    const cookies = parse(config.headers.cookie || "");
    if (cookies.accessToken) {
      config.headers.Authorization = `Bearer ${cookies.accessToken}`;
    }
  }
  return config;
});

export default axiosInstance;
