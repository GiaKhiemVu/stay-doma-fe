// app/providers/LoadingProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosAPI } from "@/api/axios";
import type { InternalAxiosRequestConfig, AxiosError } from "axios";

type LoadingCtx = {
  isScreenLoading: boolean;
  start: () => void;          // manual ON
  stop: () => void;           // manual OFF
  simulate: (ms?: number) => void; // ON for ms then OFF
};
const Ctx = createContext<LoadingCtx>({ isScreenLoading: false, start: () => {}, stop: () => {}, simulate: () => {} });
export const useLoading = () => useContext(Ctx);

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reqId = axiosAPI.interceptors.request.use((c: InternalAxiosRequestConfig) => {
      if (!c.backgroundLoading) setCount((x) => x + 1);
      return c;
    });
    const resId = axiosAPI.interceptors.response.use(
      (res) => { if (!(res.config as InternalAxiosRequestConfig).backgroundLoading) setCount((x) => Math.max(0, x - 1)); return res; },
      (err: AxiosError) => { if (!(err.config as InternalAxiosRequestConfig | undefined)?.backgroundLoading) setCount((x) => Math.max(0, x - 1)); return Promise.reject(err); }
    );
    return () => { axiosAPI.interceptors.request.eject(reqId); axiosAPI.interceptors.response.eject(resId); };
  }, []);

  const value = useMemo<LoadingCtx>(() => ({
    isScreenLoading: count > 0,
    start: () => setCount((x) => x + 1),
    stop: () => setCount((x) => Math.max(0, x - 1)),
    simulate: (ms = 1500) => { setCount((x) => x + 1); setTimeout(() => setCount((x) => Math.max(0, x - 1)), ms); },
  }), [count]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
