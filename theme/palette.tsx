// app/theme/palette.ts
import { alpha } from "@mui/material/styles";

export type Mode = "light" | "dark";

/** Base brand choices you can expose in the Theme Manager */
export const BRAND_PRESETS = {
    blue: "#1976d2",
    teal: "#0ea5a3",
    green: "#10b981",
    purple: "#8b5cf6",
    orange: "#ff6d00",
    red: "#ef4444",
} as const;

export const neutral = {
    0: "#FFFFFF",
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
    950: "#0B0D12",
} as const;

export function getDesignTokens(mode: Mode, primaryMain: string) {
    const isDark = mode === "dark";

    return {
        palette: {
            mode,
            // main brand
            primary: {
                main: primaryMain,
                light: isDark ? alpha(primaryMain, 0.85) : alpha(primaryMain, 0.9),
                dark: isDark ? alpha(primaryMain, 0.75) : alpha(primaryMain, 0.8),
                contrastText: "#fff",
            },
            // helpful secondary for accents (calendar ranges, chips)
            secondary: {
                main: isDark ? "#8b5cf6" : "#6d28d9",
                contrastText: "#fff",
            },
            success: { main: "#22c55e", dark: "#16a34a" },
            warning: { main: "#f59e0b", dark: "#d97706" },
            error: { main: "#ef4444", dark: "#dc2626" },
            info: { main: "#0ea5e9", dark: "#0284c7" },

            // backgrounds
            background: {
                default: isDark ? neutral[950] : "#f6f8fb",
                paper: isDark ? "#14161b" : neutral[0],
            },

            // text/lines tuned for hotel admin readability
            text: {
                primary: isDark ? "#E6E8EE" : "#0B1220",
                secondary: isDark ? "rgba(230,232,238,0.67)" : "rgba(11,18,32,0.64)",
                disabled: isDark ? "rgba(230,232,238,0.38)" : "rgba(11,18,32,0.38)",
            },
            divider: isDark ? "rgba(255,255,255,0.12)" : "rgba(10,20,40,0.12)",

            // custom neutrals (nice for borders/fills)
            grey: {
                50: neutral[50], 100: neutral[100], 200: neutral[200], 300: neutral[300],
                400: neutral[400], 500: neutral[500], 600: neutral[600], 700: neutral[700],
                800: neutral[800], 900: neutral[900],
                A100: isDark ? "#2A2F3A" : "#F3F5F9",
            },

            // channels (optional) for alpha blends in components
            action: {
                hoverOpacity: 0.08,
                selectedOpacity: 0.12,
                disabledOpacity: 0.38,
                focusOpacity: 0.12,
                activeOpacity: 0.5,
            },
        },

        // handy gradient helpers if you need them in sx
        gradients: {
            hero: isDark
                ? "linear-gradient(180deg,#0b0d12 0%, #0e1017 100%)"
                : "linear-gradient(180deg,#ecf2ff 0%, #f6f8fb 100%)",
            primarySoft: (alphaAmt = 0.16) => `linear-gradient(180deg, ${alpha(primaryMain, alphaAmt)}, transparent)`,
        },
    };
}
