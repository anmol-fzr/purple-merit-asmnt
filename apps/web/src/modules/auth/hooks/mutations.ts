import { useMutation } from "@tanstack/react-query";
import { AUTH } from "../api";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { useId } from "react";
import { setAuthData } from "../store";

export const useSignUp = () => {
  const id = useId();

  const loadingMsg = "Creating Account ...";
  const successMsg = "Account Created Successfully";
  const errorMsg = "Unable to Create Account";

  const router = useRouter();

  return useMutation({
    mutationFn: AUTH.SIGN_UP,
    onMutate() {
      toast.loading(loadingMsg, { id });
    },
    onSuccess(data) {
      setAuthData({
        user: data.data,
      });
      toast.success(successMsg, { id });
      router.navigate({ to: "/dashboard" });
    },
    onError({ message = errorMsg }) {
      toast.error(message, { id });
    },
  });
};

export const useSignIn = () => {
  const id = useId();

  const loadingMsg = "Login ...";
  const successMsg = "Logged In Successfully";
  const errorMsg = "Unable to Login";

  const router = useRouter();

  return useMutation({
    mutationFn: AUTH.SIGN_IN,
    onMutate() {
      toast.loading(loadingMsg, { id });
    },
    onSuccess(data) {
      setAuthData({
        user: data.data,
      });
      toast.success(successMsg, { id });
      router.navigate({ to: "/dashboard" });
    },
    onError({ message = errorMsg }) {
      toast.error(message, { id });
    },
  });
};
