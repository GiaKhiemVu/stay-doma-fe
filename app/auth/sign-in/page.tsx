"use client";

import * as React from "react";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Link as MuiLink,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
    Divider,
    Paper,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HotelIcon from "@mui/icons-material/Hotel";
import { useRouter } from "next/navigation";

import { useLoading } from "@/app/providers/LoadingProvider";
import { useNotify } from "@/app/providers/NotificationProvider";

export default function SignInPage() {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
    const router = useRouter();
    const { simulate } = useLoading();
    const { success, error, info } = useNotify();

    const br = (mult = 1) => {
        const v = theme.shape.borderRadius as unknown;
        const base =
            typeof v === "number" ? v : typeof v === "string" ? parseFloat(v) || 10 : 10;
        return base * mult;
    };

    const [showPwd, setShowPwd] = React.useState(false);
    const [remember, setRemember] = React.useState(true);
    const [form, setForm] = React.useState({ email: "", password: "" });
    const [errs, setErrs] = React.useState<{ email?: string; password?: string }>({});
    const emailRef = React.useRef<HTMLInputElement | null>(null);
    const pwdRef = React.useRef<HTMLInputElement | null>(null);
    const [shake, setShake] = React.useState<"none" | "email" | "pwd">("none");

    const shakeSx = (key: "email" | "pwd") => ({
    animation: shake === key ? "sh 0.35s ease" : "none",
        "@keyframes sh": {
            "0%,100%": { transform: "translateX(0)" },
            "20%": { transform: "translateX(-4px)" },
            "40%": { transform: "translateX(4px)" },
            "60%": { transform: "translateX(-3px)" },
            "80%": { transform: "translateX(3px)" },
        },
    });


    const onChange =
        (k: "email" | "password") =>
            (e: React.ChangeEvent<HTMLInputElement>) =>
                setForm((s) => ({ ...s, [k]: e.target.value }));

    function validate() {
        const e: typeof errs = {};
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
        if (!form.password) e.password = "Password is required";
        setErrs(e);

        const first = e.email ? "email" : e.password ? "pwd" : "none";
        setShake(first);
        if (first === "email") emailRef.current?.focus();
        if (first === "pwd") pwdRef.current?.focus();
        if (first !== "none") setTimeout(() => setShake("none"), 400);

        return Object.keys(e).length === 0;
    }

    async function onSubmit(e?: React.FormEvent) {
        e?.preventDefault();
        if (!validate()) return;

        simulate(1200);
        try {
            if (form.email === "manager@staydoma.com" && form.password === "demo123") {
                success("Welcome back, Manager!");
                router.push("/dashboard");
            } else {
                throw new Error("Invalid email or password");
            }
        } catch (err: any) {
            error(err?.message ?? "Sign-in failed");
        }
    }

    const bgPrimary = theme.palette.primary.main;
    const isDark = theme.palette.mode === "dark";

    return (
        <Grid container sx={{ minHeight: "100vh", backgroundColor: theme.palette.background.default }}>
            {/* Palette-based background */}
            <Box
                sx={{
                    position: "fixed",
                    inset: 0,
                    zIndex: -1,
                    background: `
            radial-gradient(1000px 700px at -15% -10%, ${alpha(bgPrimary, isDark ? 0.15 : 0.12)} 0%, transparent 60%),
            linear-gradient(180deg, ${alpha(theme.palette.background.paper, isDark ? 0.06 : 0.5)} 0%, ${theme.palette.background.default
                        } 100%)
          `,
                }}
            />

            {/* HERO (md+) */}
            {isMdUp && (
                <Grid
                    size={{ md: 6, lg: 7 }}
                    sx={{ display: "grid", placeItems: "center", px: 4 }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            px: 6,
                            py: 5,
                            borderRadius: br(1.2),
                            maxWidth: 560,
                            backdropFilter: "blur(16px) saturate(140%)",
                            backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.55 : 0.75),
                            border: `1px solid ${alpha(theme.palette.divider, 0.9)}`,
                            boxShadow: isDark
                                ? `0 12px 40px ${alpha(theme.palette.common.black, 0.55)}`
                                : `0 12px 40px ${alpha(bgPrimary, 0.18)}`,
                        }}
                    >
                        <Stack spacing={2.5} alignItems="center" textAlign="center">
                            <HotelIcon sx={{ fontSize: 56, color: theme.palette.primary.main }} />
                            <Typography variant="h4" fontWeight={800} letterSpacing={0.2} color="text.primary">
                                Stay Doma
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 440 }}>
                                Manage bookings, room availability, and guest profiles in one streamlined workspace.
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ color: "text.secondary", fontSize: 13 }}>
                                <Box>• Real-time calendar</Box>
                                <Box>• Fast check-ins</Box>
                                <Box>• Team roles</Box>
                            </Stack>
                        </Stack>
                    </Paper>
                </Grid>
            )}

            {/* FORM */}
            <Grid
                size={{ xs: 12, md: 6, lg: 5 }}
                sx={{ display: "grid", placeItems: "center", px: { xs: 2.5, sm: 4 }, py: { xs: 6, md: 0 } }}
            >
                <Paper
                    variant="outlined"
                    sx={{
                        width: "100%",
                        maxWidth: 460,
                        p: { xs: 3, sm: 4 },
                        borderRadius: br(0.5),
                        backgroundColor: alpha(theme.palette.background.paper, isDark ? 0.92 : 0.98),
                        boxShadow: isDark
                            ? `0 8px 28px ${alpha(theme.palette.common.black, 0.35)}`
                            : `0 8px 28px ${alpha(bgPrimary, 0.12)}`,
                        borderColor: alpha(theme.palette.divider, isDark ? 0.6 : 0.9),
                    }}
                >
                    {!isMdUp && (
                        <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
                            <HotelIcon sx={{ color: theme.palette.primary.main }} />
                            <Typography variant="h6" fontWeight={800} color="text.primary">
                                Stay Doma Admin
                            </Typography>
                        </Stack>
                    )}

                    <Typography variant="h5" fontWeight={800} mb={0.5} color="text.primary">
                        Sign in
                    </Typography>

                    {/* brand accent */}
                    <Box
                        sx={{
                            height: 3,
                            width: 48,
                            borderRadius: 2,
                            mb: 2,
                            background: `linear-gradient(90deg, ${alpha(bgPrimary, 0.9)}, ${alpha(bgPrimary, 0.4)})`,
                        }}
                    />

                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Use your staff account to access the dashboard.
                    </Typography>

                    <Box component="form" noValidate onSubmit={onSubmit}>
                        <Stack spacing={2}>
                            {/* Email */}
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                required
                                autoFocus
                                value={form.email}
                                onChange={onChange("email")}
                                error={!!errs.email}
                                helperText={errs.email}
                                inputRef={emailRef}
                                slotProps={{
                                    input: {
                                        sx: { borderRadius: br(1) },
                                        autoComplete: "email"
                                    },
                                    formHelperText: { sx: { mt: 0.5, fontSize: 12 } }
                                    
                                }}
                                sx={{
                                    ...shakeSx("email"),
                                    "& .MuiOutlinedInput-root.Mui-error": {
                                    boxShadow: (t) =>
                                        t.palette.mode === "dark"
                                        ? `0 0 0 2px ${t.palette.error.main}33`
                                        : `0 0 0 2px ${t.palette.error.main}22`,
                                    },
                                }}
                            />

                            {/* Password */}
                            <TextField
                                label="Password"
                                required
                                fullWidth
                                type={showPwd ? "text" : "password"}
                                value={form.password}
                                onChange={onChange("password")}
                                error={!!errs.password}
                                helperText={errs.password}
                                inputRef={pwdRef}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={showPwd ? "Hide password" : "Show password"}
                                                    onClick={() => setShowPwd((s) => !s)}
                                                    edge="end"
                                                    sx={{ color: "text.secondary" }}
                                                >
                                                    {showPwd ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        autoComplete: "current-password",
                                        sx: { borderRadius: br(1) },
                                    },
                                    formHelperText: { sx: { mt: 0.5, fontSize: 12 } },
                                }}
                                sx={{
                                    ...shakeSx("pwd"),
                                    "& .MuiOutlinedInput-root.Mui-error": {
                                    boxShadow: (t) =>
                                        t.palette.mode === "dark"
                                        ? `0 0 0 2px ${t.palette.error.main}33`
                                        : `0 0 0 2px ${t.palette.error.main}22`,
                                    },
                                }}
                            />

                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={remember}
                                            onChange={(e) => setRemember(e.target.checked)}
                                            inputProps={{ "aria-label": "Remember me" }}
                                            sx={{ color: "text.secondary" }}
                                        />
                                    }
                                    label="Remember me"
                                />
                                <MuiLink
                                    href="/auth/forget-password"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        info("Password reset link coming soon");
                                    }}
                                    underline="hover"
                                    role="button"
                                    sx={{ cursor: "pointer", color: "primary.main", fontWeight: 600 }}
                                >
                                    Forgot password?
                                </MuiLink>
                            </Stack>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{
                                    py: 1.25,
                                    fontWeight: 800,
                                    textTransform: "none",
                                    borderRadius: br(0.8),
                                    boxShadow: isDark
                                        ? `0 6px 18px ${alpha(bgPrimary, 0.22)}`
                                        : `0 6px 18px ${alpha(bgPrimary, 0.25)}`,
                                }}
                            >
                                Sign in
                            </Button>

                            <Divider sx={{ my: 0.5, borderColor: alpha(theme.palette.divider, 0.8) }}>
                                or
                            </Divider>

                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={() => {
                                    simulate(1000);
                                    info("SSO coming soon");
                                }}
                                sx={{
                                    textTransform: "none",
                                    py: 1.15,
                                    borderRadius: br(0.8),
                                    borderColor: alpha(theme.palette.primary.main, isDark ? 0.35 : 0.5),
                                    "&:hover": {
                                        borderColor: theme.palette.primary.main,
                                        backgroundColor: alpha(theme.palette.primary.main, 0.06),
                                    },
                                }}
                            >
                                Continue with SSO
                            </Button>
                        </Stack>
                    </Box>

                    <Typography variant="caption" color="text.secondary" display="block" mt={3}>
                        By continuing you agree to the Terms & Privacy. This site uses cookies for secure sessions.
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}