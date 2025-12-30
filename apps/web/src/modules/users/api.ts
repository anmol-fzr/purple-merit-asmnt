import { axiosInstance, type IResData } from "@/lib/api";
import type { Role } from "../auth/api";

const { get, patch } = axiosInstance;

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

type IResAllUsers = IResData<User[], true>;

interface IReqAllUsersQuery {
  page: number;
  limit: number;
}

interface IReqUpdateUser {
  userId: string;
  status: UserStatus;
}

type IResUpdateUser = IResData<User>;

export const USERS = {
  ALL: (params: IReqAllUsersQuery) =>
    get<never, IResAllUsers>("/users", { params }),
  UPDATE_ONE: (payload: IReqUpdateUser) => {
    const { userId, ...body } = payload;

    return patch<IReqUpdateUser, IResUpdateUser>(`/users/${userId}`, body);
  },
} as const;
