import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USERS } from "../api";
import { toast } from "sonner";
import { useId } from "react";
import { getUsersOpts } from "./queries";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const id = useId();

  const loadingMsg = "Updating User ...";
  const successMsg = "User Updated Successfully";
  const errorMsg = "Unable to Update User";

  return useMutation({
    mutationFn: USERS.UPDATE_ONE,
    onMutate() {
      toast.loading(loadingMsg, { id });
    },
    onSuccess() {
      const opts = getUsersOpts();

      queryClient.invalidateQueries({ queryKey: opts.queryKey });

      toast.success(successMsg, { id });
    },
    onError({ message = errorMsg }) {
      toast.error(message, { id });
    },
  });
};
