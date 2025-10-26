"use client";

import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { deepmerge } from "@mui/utils";
import type { RootState } from "@/redux/store";
import { setPanelOpen } from "@/redux/slice/themeSlice";

const ThemeCtx = React.createContext<{
  panelOpen: boolean;
  setPanelOpen: (v: boolean) => void;
  // expose whole theme slice if you want to tweak from UI
  state: RootState["theme"];
} | null>(null);

export function useAppTheme() {
  const ctx = React.useContext(ThemeCtx);
  if (!ctx) throw new Error("useAppTheme must be used inside ThemeProviderClient");
  return ctx;
}

export default function ThemeProviderClient({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const state = useSelector((s: RootState) => s.theme);

  const theme = React.useMemo(() => {
    const base = createTheme({
      palette: {
        mode: state.mode,
        primary: { main: state.primary },
      },
      shape: { borderRadius: state.radius },
      components: {
        MuiButton: { styleOverrides: { root: { borderRadius: state.radius * 0.8 } } },
        MuiOutlinedInput: { styleOverrides: { root: { borderRadius: state.radius } } },
        MuiPaper: { styleOverrides: { rounded: { borderRadius: state.radius } } },
      },
    });
    return deepmerge(base, {});
  }, [state.mode, state.primary, state.radius]);

  React.useEffect(() => {
    // Nice mobile address bar color
    const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (meta) meta.content = state.mode === "dark" ? "#0e1017" : "#ffffff";
  }, [state.mode]);

  return (
    <ThemeCtx.Provider value={{ panelOpen: state.panelOpen, setPanelOpen: v => dispatch(setPanelOpen(v)), state }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeCtx.Provider>
  );
}
