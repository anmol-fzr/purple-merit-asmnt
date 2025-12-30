import { axiosInstance, type IResData } from "@/lib/api";

const { post } = axiosInstance;

interface IReqSignUp {
  fullName: string;
  email: string;
  password: string;
}

type IResSignUp = IResData<{ token: string; name: string }>;

interface IReqSignIn {
  email: string;
  password: string;
}

type IResSignIn = IResData<{ token: string; name: string }>;

export const AUTH = {
  SIGN_UP: (payload: IReqSignUp) =>
    post<IReqSignUp, IResSignUp>("/auth/sign-up", payload),
  SIGN_IN: (payload: IReqSignIn) =>
    post<IReqSignIn, IResSignIn>("/auth/sign-in", payload),
} as const;
