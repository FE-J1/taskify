import axios from "axios";
import { parse } from "cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  // 서버사이드
  if (typeof window === "undefined" && config.headers) {
    const cookies = parse(config.headers.cookie || "");
    if (cookies.accessToken) {
      config.headers.Authorization = `Bearer ${cookies.accessToken}`;
    }
  }
  // 클라이언트사이드
  else if (typeof window !== "undefined") {
    const cookies = parse(document.cookie);
    if (cookies.accessToken) {
      config.headers.Authorization = `Bearer ${cookies.accessToken}`;
    }
  }
  return config;
});

export default axiosInstance;
