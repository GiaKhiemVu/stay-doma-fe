import EmotionRegistry from "@/app/providers/EmotionRegistry";
import ThemeProviderClient from "@/app/providers/ThemeProvider";
import NotificationProvider from "@/app/providers/NotificationProvider";
import LoadingProvider from "@/app/providers/LoadingProvider";
import LoadingScreen from "@/components/loading/LoadingScreen";
import Notification from "@/components/notification/Notification";
import ThemeFab from "@/components/theme/ThemeFab";
import ThemeManager from "@/components/theme/ThemeManager";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <EmotionRegistry>
            <ThemeProviderClient>
                <LoadingProvider>
                    <NotificationProvider>
                        {children}
                        <LoadingScreen />
                        <Notification />
                        <ThemeFab />
                        <ThemeManager />
                    </NotificationProvider>
                </LoadingProvider>
            </ThemeProviderClient>
        </EmotionRegistry>
    )
}