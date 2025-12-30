import { axiosInstance, type IResData } from "@/lib/api";
import type { UserStatus } from "../users/api";

const { get, post } = axiosInstance;

export type Role = "admin" | "user";

interface AuthData {
  token: string;
  name: string;
  role: Role;
}

interface IReqSignUp {
  fullName: string;
  email: string;
  password: string;
}

type IResSignUp = IResData<AuthData>;

interface IReqSignIn {
  email: string;
  password: string;
}

type IResSignIn = IResData<AuthData>;

interface UserProfile {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  role: Role;
  status: UserStatus;
  lastLogin: any;
  createdAt: string;
  updatedAt: string;
}
type IResUserProfile = IResData<UserProfile>;

export const AUTH = {
  SIGN_UP: (payload: IReqSignUp) =>
    post<IReqSignUp, IResSignUp>("/auth/sign-up", payload),
  SIGN_IN: (payload: IReqSignIn) =>
    post<IReqSignIn, IResSignIn>("/auth/sign-in", payload),
  PROFILE: () => get<IResUserProfile, IResUserProfile>("/auth/profile"),
} as const;
