"use client"

import { axiosAPI } from "@/api/axios";
import { useNotify } from "./providers/NotificationProvider";

export default function Home() {
  const { notify, success, error, info, warning } = useNotify();

  const testAPI = async () => {
    await axiosAPI.get("/test", { backgroundLoading: false });
    success("Fetch API success to /test")
  }

  const testNotify = () => {
    success("Test Notify 1")
    info("Test Notify 2")
    warning("Test Notify 3")
    error("Test Notify 4")
  }

  return (
    <div>
      <div>Home</div>
      <div className="flex gap-2">
        <button onClick={testAPI}>Test fetch API</button>
        <button onClick={testNotify}>Test Notify</button>
    </div>
    </div>
  );
}
