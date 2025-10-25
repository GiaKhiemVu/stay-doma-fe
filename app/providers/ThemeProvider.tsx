"use client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme();

export default function ThemeProviderClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
