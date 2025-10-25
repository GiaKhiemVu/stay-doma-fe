"use client";

import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

export const axiosAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true,
  timeout: 20_000,
  headers: new AxiosHeaders({ "Content-Type": "application/json" }),
});

// Request -> url -> payload
axiosAPI.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const h = AxiosHeaders.from(config.headers);
  config.headers = h;

  const url = `${config.baseURL ?? ""}${config.url ?? ""}`;
  console.log("request ->", url, "-> payload:", config.data ?? null);

  return config;
});

// Response -> url -> data
axiosAPI.interceptors.response.use(
  (res: AxiosResponse) => {
    const cfg = res.config as InternalAxiosRequestConfig;
    const url = `${cfg.baseURL ?? ""}${cfg.url ?? ""}`;
    console.log("response ->", url, "-> data:", res.data);
    return res;
  },
  async (err: AxiosError<any>) => {
    const cfg = err.config as InternalAxiosRequestConfig | undefined;
    const url = `${cfg?.baseURL ?? ""}${cfg?.url ?? ""}`;
    console.log("response ->", url, "-> data:", err.response?.data ?? null);

    const status = err.response?.status;
    return Promise.reject({
      status,
      message:
        (err.response?.data as any)?.message ??
        err.message ??
        "Network error",
      data: err.response?.data,
    });
  }
);
