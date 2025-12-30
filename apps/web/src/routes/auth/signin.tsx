import { createFileRoute } from "@tanstack/react-router";
import { SignInScreen } from "@/modules/auth/screens/signin.screen";

export const Route = createFileRoute("/auth/signin")({
  component: SignInScreen,
});
