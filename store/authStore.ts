import { create } from "zustand";
import { getUserInfo } from "@/utils/api/authApi";

interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },
  login: (user: User) => {
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  checkAuth: async () => {
    try {
      // 클라이언트 사이드에서만 실행
      if (typeof window !== "undefined") {
        const user = await getUserInfo();
        if (user) {
          set({ user, isAuthenticated: true });
        }
      }
    } catch (error) {
      console.error("인증 확인 실패:", error);
      set({ user: null, isAuthenticated: false });
    }
  },
}));
