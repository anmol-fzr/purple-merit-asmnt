import { useAuthStore } from "@/modules/auth/store";
import axios from "axios";
import { env } from "@pm/env/web";

export type IResData<D = any, P extends boolean = false> = {
  data: D;
  message: string;
  paginate: P extends true
    ? {
        total: number;
        hasMore: boolean;
        nextPage: number;
      }
    : undefined;
};

const axiosInstance = axios.create({
  baseURL: env.VITE_SERVER_URL,
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
