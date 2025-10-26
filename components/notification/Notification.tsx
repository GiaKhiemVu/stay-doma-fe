"use client";

import { alpha, Box, Paper, Stack, Typography, Slide, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";
import { useNotify } from "@/app/providers/NotificationProvider";
import { JSX } from "react";

const ICONS: Record<string, JSX.Element> = {
  success: <CheckCircleIcon fontSize="small" />,
  info: <InfoIcon fontSize="small" />,
  warning: <WarningAmberIcon fontSize="small" />,
  error: <ErrorIcon fontSize="small" />,
};

export default function Notification() {
  const { toasts, close } = useNotify();

  return (
    <Box
      sx={{
        position: "fixed",
        top: "max(12px, env(safe-area-inset-top))",
        right: "max(12px, env(safe-area-inset-right))",
        zIndex: (t) => t.zIndex.tooltip + 10,
        pointerEvents: "none",
      }}
    >
      <Stack spacing={1.2} alignItems="flex-end">
        {toasts.map((t, i) => (
          <Slide key={t.id} in direction="down" mountOnEnter unmountOnExit>
            <Paper
              elevation={0}
              sx={(theme) => ({
                pointerEvents: "auto",
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1.5,
                py: 1.2,
                minWidth: 260,
                maxWidth: 360,
                borderRadius: 3,
                // iOS glassmorphism
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? alpha("#1a1a1a", 0.6)
                    : alpha("#ffffff", 0.65),
                backdropFilter: "blur(18px) saturate(140%)",
                WebkitBackdropFilter: "blur(18px) saturate(140%)",
                // soft shadow like iOS notification banners
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 6px 24px rgba(0,0,0,0.45)"
                    : "0 6px 24px rgba(0,0,0,0.15)",
                // a thin colored accent on the left for severity
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 8,
                  bottom: 8,
                  width: 3,
                  borderRadius: 2,
                  background:
                    t.severity === "success"
                      ? "#34c759"
                      : t.severity === "info"
                      ? "#0a84ff"
                      : t.severity === "warning"
                      ? "#ffd60a"
                      : "#ff453a",
                },
              })}
            >
              <Box
                sx={(theme) => ({
                  ml: 1, // account for the accent bar
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  alignItems: "center",
                  columnGap: 1,
                  width: "100%",
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                })}
              >
                <Box
                  sx={(theme) => ({
                    display: "grid",
                    placeItems: "center",
                    height: 28,
                    width: 28,
                    borderRadius: 999,
                    background:
                      t.severity === "success"
                        ? alpha("#34c759", 0.18)
                        : t.severity === "info"
                        ? alpha("#0a84ff", 0.18)
                        : t.severity === "warning"
                        ? alpha("#ffd60a", 0.22)
                        : alpha("#ff453a", 0.18),
                    color:
                      t.severity === "success"
                        ? "#1faa52"
                        : t.severity === "info"
                        ? "#0a84ff"
                        : t.severity === "warning"
                        ? "#b58900"
                        : "#ff453a",
                  })}
                >
                  {ICONS[t.severity]}
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1.35,
                    pr: 1,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3, // clamp long text
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {t.message}
                </Typography>

                <IconButton
                  size="small"
                  onClick={() => close(t.id)}
                  sx={{
                    color: "inherit",
                    opacity: 0.7,
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          </Slide>
        ))}
      </Stack>
    </Box>
  );
}
