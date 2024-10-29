import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import axiosInstance from "@/utils/api/axiosInstanceApi";

const getTokenFromCookie = () => {
  if (typeof window === "undefined") return null;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];
};

// 인터셉터 설정
axiosInstance.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      // 로그인 요청
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { user, accessToken } = response.data;

      // 토큰을 쿠키에 설정
      res.setHeader(
        "Set-Cookie",
        serialize("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 3600,
          path: "/",
          domain:
            process.env.NODE_ENV === "production" ? ".vercel.app" : "localhost",
        })
      );

      // 이후의 요청에서 사용할 수 있도록 axiosInstance의 기본 헤더 설정
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      res.status(200).json({
        user,
        accessToken,
      });
      console.log("Login success:", user);
    } catch (error) {
      res.status(401).json({ message: "Authentication failed" });
      console.error("Login failed:", error);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
