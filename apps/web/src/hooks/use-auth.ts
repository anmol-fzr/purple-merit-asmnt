import { useAuthStore } from "@/modules/auth/store";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isLogin = user !== null;
  const navigate = useNavigate();

  const logout = useCallback(() => {
    useAuthStore.setState({
      user: null,
    });
    navigate({ to: "/auth/signin" });
  }, [useAuthStore, navigate]);

  return { user, isLogin, logout };
};
