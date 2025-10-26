import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { PaletteMode } from "@mui/material";

export type ThemeState = {
    mode: PaletteMode;
    primary: string;   // hex
    radius: number;    // px
    panelOpen: boolean;
};

const STORAGE_KEY = "stay-doma.theme.v1";

function load(): ThemeState | undefined {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return undefined;
        return JSON.parse(raw) as ThemeState;
    } catch {
        return undefined;
    }
}

const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches;

const initialState: ThemeState =
    load() ?? { mode: prefersDark ? "dark" : "light", primary: "#1976d2", radius: 10, panelOpen: false };

const slice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setMode(s, a: PayloadAction<PaletteMode>) { s.mode = a.payload; },
        setPrimary(s, a: PayloadAction<string>) { s.primary = a.payload; },
        setRadius(s, a: PayloadAction<number>) { s.radius = a.payload; },
        setPanelOpen(s, a: PayloadAction<boolean>) { s.panelOpen = a.payload; },
        setAll(s, a: PayloadAction<Partial<ThemeState>>) { Object.assign(s, a.payload); },
    },
});

export const { setMode, setPrimary, setRadius, setPanelOpen, setAll } = slice.actions;
export default slice.reducer;

// Simple persistence hook (call from store.ts after store is created)
export function persistThemeSelector(state: { theme: ThemeState }) {
    const { panelOpen, ...persistable } = state.theme;
    return persistable;
}
export function saveThemeToStorage(state: { theme: ThemeState }) {
    try {
        const { panelOpen, ...persistable } = state.theme;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
    } catch { }
}
