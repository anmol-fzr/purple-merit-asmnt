import { axiosInstance, type IResData } from "@/lib/api";
import type { Role } from "../auth/api";

const { get } = axiosInstance;

export type UserStatus = "active" | "inactive";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: Role;
  status: UserStatus;
  lastLogin: any;
  createdAt: string;
  updatedAt: string;
}

type IResSignUp = IResData<User[], true>;

export const USERS = {
  ALL: () => get<never, IResSignUp>("/users"),
  // SIGN_IN: (payload: IReqSignIn) =>
  //   post<IReqSignIn, IResSignIn>("/auth/sign-in", payload),
} as const;
