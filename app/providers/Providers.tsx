"use client";

import dynamic from "next/dynamic";

import EmotionRegistry from "@/app/providers/EmotionRegistry";
import NotificationProvider from "@/app/providers/NotificationProvider";
import LoadingProvider from "@/app/providers/LoadingProvider";
import ReduxProvider from "@/app/providers/ReduxProvider";

import LoadingScreen from "@/components/loading/LoadingScreen";
import Notification from "@/components/notification/Notification";
import ThemeFab from "@/components/theme/ThemeFab";
import ThemeManager from "@/components/theme/ThemeManager";

// ⬇️ Load ThemeProvider on the client only to avoid SSR/CSR theme mismatch
const ThemeProviderNoSSR = dynamic(() => import("@/app/providers/ThemeProvider"), {
  ssr: false,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ReduxProvider>
        <ThemeProviderNoSSR>
          <LoadingProvider>
            <NotificationProvider>
              {children}
              <LoadingScreen />
              <Notification />
              <ThemeFab />
              <ThemeManager />
            </NotificationProvider>
          </LoadingProvider>
        </ThemeProviderNoSSR>
      </ReduxProvider>
    </EmotionRegistry>
  );
}
