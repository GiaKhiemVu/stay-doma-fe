// app/layout.tsx
import EmotionRegistry from "@/app/providers/EmotionRegistry";
import ThemeProviderClient from "@/app/providers/ThemeProvider";
import NotificationProvider from "@/app/providers/NotificationProvider";
import LoadingProvider from "@/app/providers/LoadingProvider";
import LoadingScreen from "@/components/loading/LoadingScreen";
import Notification from "@/components/notification/Notification";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <EmotionRegistry>
          <ThemeProviderClient>
            <LoadingProvider>
              <NotificationProvider>
                {children}
                <LoadingScreen />
                <Notification />
              </NotificationProvider>
            </LoadingProvider>
          </ThemeProviderClient>
        </EmotionRegistry>
      </body>
    </html>
  );
}
