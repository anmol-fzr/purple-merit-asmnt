import { createFileRoute } from "@tanstack/react-router";
import { SignUpScreen } from "@/modules/auth/screens";

export const Route = createFileRoute("/auth/signup/")({
  component: SignUpScreen,
});
