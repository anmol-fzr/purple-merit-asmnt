import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthStoreEmpty {
  user: null;
}

interface AuthStoreWithData {
  user: {
    name: string;
    token: string;
  };
}

interface AuthStoreActions {
  setData: (payload: Pick<AuthStoreWithData, "user">) => void;
  resetData: VoidFunction;
}

type AuthStore = (AuthStoreEmpty | AuthStoreWithData) & AuthStoreActions;

const useAuthStore = create<AuthStore>()(
  persist(
    immer((set, get) => ({
      user: null,

      setData(payload) {
        set((currState) => {
          currState.user = payload.user;
        });
      },

      resetData() {
        set({
          user: null,
        });
      },
    })),
    { name: "auth-store" },
  ),
);

export const { setData: setAuthData } = useAuthStore.getState();

export { useAuthStore };
