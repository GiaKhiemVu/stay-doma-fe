// app/providers/ThemeProviderClient.tsx
"use client";
import * as React from "react";
import { ThemeProvider, createTheme, CssBaseline, PaletteMode } from "@mui/material";

type ThemeState = { mode: PaletteMode; primary: string; radius: number };
type Ctx = {
  state: ThemeState;
  setState: React.Dispatch<React.SetStateAction<ThemeState>>;
  panelOpen: boolean;
  setPanelOpen: (v: boolean) => void;
};

const ThemeCtx = React.createContext<Ctx | null>(null);
export const useAppTheme = () => {
  const v = React.useContext(ThemeCtx);
  if (!v) throw new Error("useAppTheme must be used within ThemeProviderClient");
  return v;
};

export default function ThemeProviderClient({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ThemeState>({ mode: "light", primary: "#1976d2", radius: 10 });
  const [panelOpen, setPanelOpen] = React.useState(false);

  const theme = React.useMemo(() => createTheme({ palette: { mode: state.mode, primary: { main: state.primary } }, shape: { borderRadius: state.radius } }), [state]);

  const ctx = React.useMemo(() => ({ state, setState, panelOpen, setPanelOpen }), [state, panelOpen]);

  return (
    <ThemeCtx.Provider value={ctx}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeCtx.Provider>
  );
}
