"use client";

import React, { createContext, useContext, useMemo, useRef, useState, useCallback } from "react";

export type Severity = "success" | "info" | "warning" | "error";
export type Toast = { id: number; message: string; severity: Severity; autoHideMs: number };

type Ctx = {
    toasts: Toast[];
    notify: (msg: string, opts?: { severity?: Severity; autoHideMs?: number }) => number;
    success: (msg: string, ms?: number) => number;
    info: (msg: string, ms?: number) => number;
    warning: (msg: string, ms?: number) => number;
    error: (msg: string, ms?: number) => number;
    close: (id: number) => void;
};

const Ctx = createContext<Ctx | null>(null);
export const useNotify = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error("useNotify must be used within <NotificationProvider>");
    return v;
};

const MAX_SNACK = 5;

export default function NotificationProvider({ children }: { children: React.ReactNode }) {
    const idRef = useRef(1);
    const [toasts, setToasts] = useState<Toast[]>([]); // newest first

    const close = useCallback((id: number) => {
        setToasts((list) => list.filter((t) => t.id !== id));
    }, []);

    const pushCore = useCallback((msg: string, severity: Severity, autoHideMs: number) => {
        const id = idRef.current++;
        setToasts((list) => [{ id, message: msg, severity, autoHideMs }, ...list].slice(0, MAX_SNACK));
        // auto-dismiss
        window.setTimeout(() => close(id), autoHideMs);
        return id;
    }, [close]);

    const api = useMemo<Ctx>(() => ({
        toasts,
        notify: (msg, opts) => pushCore(msg, opts?.severity ?? "info", opts?.autoHideMs ?? 3000),
        success: (msg, ms) => pushCore(msg, "success", ms ?? 3000),
        info: (msg, ms) => pushCore(msg, "info", ms ?? 3000),
        warning: (msg, ms) => pushCore(msg, "warning", ms ?? 3000),
        error: (msg, ms) => pushCore(msg, "error", ms ?? 3000),
        close,
    }), [toasts, pushCore, close]);

    return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
