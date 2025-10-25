// app/api/fake/route.ts
import { NextResponse } from "next/server";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET() {
    await wait(3000);
    return NextResponse.json({ ok: true, source: "route", waitedMs: 3000 });
}
