import { useAuthStore } from "@/modules/auth/store";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const isLogin = useAuthStore.getState().user !== null;

    if (isLogin) {
      throw redirect({ to: "/dashboard" });
    }
    throw redirect({ to: "/auth/signin" });
  },
  component: Outlet,
});
