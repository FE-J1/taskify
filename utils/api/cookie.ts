import Cookies from "js-cookie";

// 쿠키에서 토큰을 읽어오는 유틸리티 함수
export const parseCookie = () => {
  return {
    "access-token": Cookies.get("accessToken"), // 쿠키에서 access-token 가져오기
  };
};

export const setAccessToken = (token: string) => {
  Cookies.set("accessToken", token, { expires: 1 }); // 유효기간 1일
};
