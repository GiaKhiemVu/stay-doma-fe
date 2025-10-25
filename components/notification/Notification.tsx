"use client";

import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNotify } from "@/app/providers/NotificationProvider";

export default function Notification() {
    const { toasts, close } = useNotify();

    return (
        <div
            style={{
                position: "fixed",
                top: 12,
                right: 12,
                zIndex: 1400, // above app UI
                pointerEvents: "none", // clicks pass through gaps
            }}
        >
            <Stack spacing={1} alignItems="flex-end">
                {toasts.map((t) => (
                    <Grow in key={t.id}>
                        <Paper elevation={6} sx={{ pointerEvents: "auto" }}>
                            <Alert
                                severity={t.severity}
                                variant="filled"
                                action={
                                    <IconButton
                                        size="small"
                                        color="inherit"
                                        onClick={() => close(t.id)}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                }
                                sx={{ alignItems: "center" }}
                            >
                                {t.message}
                            </Alert>
                        </Paper>
                    </Grow>
                ))}
            </Stack>
        </div>
    );
}
