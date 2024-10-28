import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import axiosInstance from "@/utils/api/axiosInstanceApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const { user, accessToken } = response.data;

      // Set-Cookie 헤더를 통해 accessToken 쿠키를 설정
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

      // 사용자 정보와 accessToken 전송
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
