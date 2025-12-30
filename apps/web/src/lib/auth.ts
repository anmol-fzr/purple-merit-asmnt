import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/modules/auth/store";
import { toast } from "sonner";

export const protectRoute = (requiredRole?: "admin" | "user") => {
  const { user } = useAuthStore.getState();
  const isLogin = user !== null;

  if (!isLogin || !user) {
    throw redirect({
      to: "/auth/signin",
    });
  }

  if (requiredRole && user.role !== requiredRole) {
    toast.error("Unauthorized");
    throw redirect({ to: ".." });
  }
};
