import { useSuspenseQuery } from "@tanstack/react-query";
import { AUTH } from "../api";

export const useUserProfile = () => {
  return useSuspenseQuery({
    queryKey: ["PROFILE"],
    queryFn: () => AUTH.PROFILE(),
  });
};
