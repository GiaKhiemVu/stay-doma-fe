// components/ThemeManager.tsx
"use client";

import * as React from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Divider,
    Stack,
    ToggleButtonGroup,
    ToggleButton,
    TextField,
    InputAdornment,
    Slider,
    Button,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import ColorizeRoundedIcon from "@mui/icons-material/ColorizeRounded";
import RoundedCornerRoundedIcon from "@mui/icons-material/RoundedCornerRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

import { useAppTheme } from "@/app/providers/ThemeProvider";

export default function ThemeManager() {
    const { state, setState, panelOpen, setPanelOpen } = useAppTheme();

    // handlers
    const setMode = (_: unknown, v: "light" | "dark" | null) => {
        if (v) setState((s) => ({ ...s, mode: v }));
    };

    const setPrimary = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((s) => ({ ...s, primary: e.target.value }));
    };

    const setRadius = (_: Event, v: number | number[]) => {
        const value = Array.isArray(v) ? v[0] : v;
        setState((s) => ({ ...s, radius: value }));
    };

    const reset = () => setState({ mode: "light", primary: "#1976d2", radius: 10 });

    return (
        <Drawer anchor="right" open={panelOpen} onClose={() => setPanelOpen(false)}>
            <Box sx={{ p: 2.5, width: 340, display: "grid", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h6" fontWeight={800}>
                        Theme manager
                    </Typography>
                    <IconButton onClick={() => setPanelOpen(false)} aria-label="Close">
                        <CloseRoundedIcon />
                    </IconButton>
                </Box>

                <Divider />

                {/* Appearance */}
                <Stack gap={1}>
                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                        Appearance
                    </Typography>
                    <ToggleButtonGroup value={state.mode} exclusive onChange={setMode} size="small">
                        <ToggleButton value="light" aria-label="Light">
                            <LightModeRoundedIcon fontSize="small" />
                            &nbsp;Light
                        </ToggleButton>
                        <ToggleButton value="dark" aria-label="Dark">
                            <DarkModeRoundedIcon fontSize="small" />
                            &nbsp;Dark
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>

                {/* Brand color */}
                <Stack gap={1}>
                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                        Brand color
                    </Typography>
                    <TextField
                        label="Primary (hex)"
                        value={state.primary}
                        onChange={setPrimary}
                        placeholder="#1976d2"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ColorizeRoundedIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Stack direction="row" gap={1}>
                        {["#1976d2", "#1e88e5", "#10b981", "#ef4444", "#8b5cf6", "#ff6d00"].map((c) => (
                            <Box
                                key={c}
                                onClick={() => setState((s) => ({ ...s, primary: c }))}
                                sx={{
                                    height: 28,
                                    width: 28,
                                    borderRadius: 1,
                                    bgcolor: c,
                                    cursor: "pointer",
                                    border: (t) =>
                                        c.toLowerCase() === state.primary.toLowerCase()
                                            ? `2px solid ${t.palette.getContrastText(c)}`
                                            : `1px solid ${t.palette.divider}`,
                                }}
                                title={c}
                            />
                        ))}
                    </Stack>
                </Stack>

                {/* Corner radius */}
                <Stack gap={1}>
                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                        Corner radius
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={1.5}>
                        <RoundedCornerRoundedIcon fontSize="small" />
                        <Slider value={state.radius} onChange={setRadius} min={4} max={18} step={1} sx={{ flex: 1 }} />
                        <Box sx={{ width: 36, textAlign: "right" }}>{state.radius}px</Box>
                    </Stack>
                </Stack>

                <Divider />

                <Button onClick={reset} startIcon={<RestartAltRoundedIcon />} variant="outlined" color="inherit">
                    Reset to defaults
                </Button>

                <Box sx={{ height: 4 }} />
            </Box>
        </Drawer>
    );
}
