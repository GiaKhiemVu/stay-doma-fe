// components/ThemeManager.tsx
"use client";

import * as React from "react";
import {
    Drawer, Box, Typography, IconButton, Divider, Stack,
    ToggleButtonGroup, ToggleButton, TextField, InputAdornment,
    Slider, Button
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import ColorizeRoundedIcon from "@mui/icons-material/ColorizeRounded";
import RoundedCornerRoundedIcon from "@mui/icons-material/RoundedCornerRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setPrimary, setRadius, setPanelOpen } from "@/redux/slice/themeSlice";
import type { RootState } from "@/redux/store";

// helpers
function normalizeHex(input: string): string | null {
    const raw = input.trim().replace(/^#/, "").toLowerCase();
    if (/^[0-9a-f]{3}$/.test(raw)) {
        // expand #abc -> #aabbcc
        const r = raw[0] + raw[0], g = raw[1] + raw[1], b = raw[2] + raw[2];
        return `#${r}${g}${b}`;
    }
    if (/^[0-9a-f]{6}$/.test(raw)) return `#${raw}`;
    return null;
}

export default function ThemeManager() {
    const dispatch = useDispatch();
    const themeState = useSelector((s: RootState) => s.theme);

    // local draft so user can clear/partially type without breaking theme
    const [draft, setDraft] = React.useState<string>(themeState.primary);
    const [err, setErr] = React.useState<string>("");

    // keep draft in sync if user clicks a swatch elsewhere
    React.useEffect(() => {
        setDraft(themeState.primary);
        setErr("");
    }, [themeState.primary]);

    const handleMode = (_: unknown, v: "light" | "dark" | null) => {
        if (v) dispatch(setMode(v));
    };

    const handleDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const next = e.target.value;
        setDraft(next);

        const norm = normalizeHex(next);
        if (norm) {
            dispatch(setPrimary(norm));   // only dispatch when valid
            setErr("");
        } else {
            // keep invalid in draft; do NOT dispatch
            setErr(next.trim() ? "Enter 3 or 6 hex digits (e.g. #1976d2)" : "");
        }
    };

    const handleRadius = (_: Event, v: number | number[]) => {
        const value = Array.isArray(v) ? v[0] : v;
        dispatch(setRadius(value));
    };

    const reset = () => {
        dispatch(setMode("light"));
        dispatch(setPrimary("#1976d2"));
        dispatch(setRadius(10));
    };

    return (
        <Drawer
            anchor="right"
            open={themeState.panelOpen}
            onClose={() => dispatch(setPanelOpen(false))}
        >
            <Box sx={{ p: 2.5, width: 340, display: "grid", gap: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h6" fontWeight={800}>Theme manager</Typography>
                    <IconButton onClick={() => dispatch(setPanelOpen(false))} aria-label="Close">
                        <CloseRoundedIcon />
                    </IconButton>
                </Box>

                <Divider />

                {/* Appearance */}
                <Stack gap={1}>
                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Appearance</Typography>
                    <ToggleButtonGroup value={themeState.mode} exclusive onChange={handleMode} size="small">
                        <ToggleButton value="light" aria-label="Light">
                            <LightModeRoundedIcon fontSize="small" />&nbsp;Light
                        </ToggleButton>
                        <ToggleButton value="dark" aria-label="Dark">
                            <DarkModeRoundedIcon fontSize="small" />&nbsp;Dark
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
                        value={draft}
                        onChange={handleDraftChange}
                        placeholder="#1976d2"
                        error={!!err}
                        helperText={err || " "}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <ColorizeRoundedIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {(() => {
                        const presets = ["#1976d2", "#1e88e5", "#10b981", "#ef4444", "#8b5cf6", "#ff6d00"];
                        const userHex = normalizeHex(draft); // null if invalid/empty
                        const swatches = userHex
                            ? [userHex, ...presets.filter(p => p.toLowerCase() !== userHex.toLowerCase())]
                            : presets;

                        return (
                            <Stack direction="row" gap={1} flexWrap="wrap">
                                {swatches.map((c) => (
                                    <Box
                                        key={c}
                                        onClick={() => dispatch(setPrimary(c))}
                                        sx={{
                                            height: 28,
                                            width: 28,
                                            borderRadius: 1,
                                            bgcolor: c,
                                            cursor: "pointer",
                                            border: (t) =>
                                                c.toLowerCase() === themeState.primary.toLowerCase()
                                                    ? `2px solid ${t.palette.getContrastText(c)}`
                                                    : `1px solid ${t.palette.divider}`,
                                        }}
                                        title={c}
                                    />
                                ))}
                            </Stack>
                        );
                    })()}
                </Stack>

                {/* Corner radius */}
                <Stack gap={1}>
                    <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>Corner radius</Typography>
                    <Stack direction="row" alignItems="center" gap={1.5}>
                        <RoundedCornerRoundedIcon fontSize="small" />
                        <Slider value={themeState.radius} onChange={handleRadius} min={4} max={18} step={1} sx={{ flex: 1 }} />
                        <Box sx={{ width: 36, textAlign: "right" }}>{themeState.radius}px</Box>
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
