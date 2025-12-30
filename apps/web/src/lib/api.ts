import { useAuthStore } from "@/modules/auth/store";
import axios, { type AxiosError, type AxiosResponse } from "axios";
// import { logout } from "@/lib/auth";
// import { envs } from "@/lib/envs";
// import type { IResData } from "./types";

export type IResData<D = any> = {
  data: D;
  message: string;
  //error: string;
  // paginate: {
  //
  // total: number;
  // }
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (req) => {
  const token = useAuthStore.getState().user?.token;

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// Response Interceptor: Extract only .data
axiosInstance.interceptors.response.use(
  (resp) => {
    return resp.data;
  },
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      //logout();
    }

    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject({
      data: null,
      message: error.message || "Unknown error",
    });
  },
);

export { axiosInstance };
