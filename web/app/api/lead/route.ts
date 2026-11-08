import { NextRequest, NextResponse } from "next/server";
import { sendLeadWebhook } from "@/lib/ghl";
import { isHoneypot, parseLead } from "@/lib/lead";
import { sendLeadMail } from "@/lib/mail";

export const runtime = "nodejs";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_HITS = 8;
const hits = new Map<string, number[]>();

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  if (limited(clientIp(request))) {
    return NextResponse.json({ error: "Too many notes from this network. Try later." }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Send the form as JSON." }, { status: 400 });
  }

  const parsed = parseLead(raw);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  if (isHoneypot(parsed.lead)) {
    return NextResponse.json({ ok: true });
  }

  try {
    await Promise.all([sendLeadMail(parsed.lead), sendLeadWebhook(parsed.lead)]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Lead mail failed.");
    return NextResponse.json(
      { error: "The note could not be sent. Call (305) 918-2306 and try again." },
      { status: 503 },
    );
  }
}
