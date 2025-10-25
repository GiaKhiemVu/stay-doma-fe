"use client";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLoading } from "@/app/providers/LoadingProvider";

export default function LoadingScreen() {
  const { isScreenLoading } = useLoading();
  return (
    <Backdrop open={isScreenLoading} sx={{ color: "#fff", zIndex: (t) => t.zIndex.modal + 1 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <CircularProgress color="inherit" size={28} />
        <Typography variant="body2">Loading…</Typography>
      </Box>
    </Backdrop>
  );
}
