"use client"

import { axiosAPI } from "@/api/axios";
import { useNotify } from "./providers/NotificationProvider";

export default function Home() {
  const { notify, success, error, info, warning } = useNotify();

  const testAPI = async () => {
    await axiosAPI.get("/test", { backgroundLoading: false });
  }

  const testNotify = () => {
    success("Test Notify")
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
