"use client";

import { Box, IconButton, Tooltip } from "@mui/material";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { useAppTheme } from "@/app/providers/ThemeProvider";

export default function ThemeFab() {
    const { setPanelOpen } = useAppTheme();

    return (
        <Box
            sx={{
                position: "fixed",
                right: "max(12px, env(safe-area-inset-right))",
                bottom: "max(16px, env(safe-area-inset-bottom))",
                zIndex: (t) => t.zIndex.tooltip + 10,
            }}
        >
            <Tooltip title="Theme settings">
                <IconButton
                    size="large"
                    onClick={() => setPanelOpen(true)}
                    sx={(t) => ({
                        bgcolor: t.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                        border: `1px solid ${t.palette.divider}`,
                        backdropFilter: "blur(8px)",
                        boxShadow:
                            t.palette.mode === "dark"
                                ? "0 8px 24px rgba(0,0,0,.5)"
                                : "0 8px 24px rgba(18,53,124,.18)",
                        "&:hover": { bgcolor: "primary.main", color: "#fff" },
                    })}
                    aria-label="Open theme manager"
                >
                    <SettingsRoundedIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
}
