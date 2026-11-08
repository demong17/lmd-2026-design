import { readFileSync } from "fs";
import { join } from "path";
import type { LeadPayload } from "@/lib/lead";

type DeployFile = {
  GHL_WEBHOOK_URL?: string;
};

function webhookUrl() {
  if (process.env.GHL_WEBHOOK_URL) return process.env.GHL_WEBHOOK_URL;
  try {
    const file = JSON.parse(readFileSync(join(process.cwd(), "resend.config.json"), "utf8")) as DeployFile;
    return file.GHL_WEBHOOK_URL || "";
  } catch {
    return "";
  }
}

export function ghlBody(lead: LeadPayload) {
  const fields = lead.fields;
  const firstName = fields.firstName ?? "";
  const lastName = fields.lastName ?? "";
  const fullName = fields.fullName || `${firstName} ${lastName}`.trim();
  const business = fields.business ?? "";
  const body: Record<string, string> = {
    firstName: firstName || fullName,
    lastName,
    fullName,
    name: fullName,
    email: lead.email,
    business,
    companyName: business,
    website: fields.website ?? "",
    message: fields.message ?? "",
    lookingFor: fields.lookingFor ?? "",
    budget: fields.budget ?? "",
    goals: fields.goals ?? "",
    hearAbout: fields.source ?? "",
    form: lead.subject,
    source: "livemediadigital.com",
    consent: "yes",
    emailConsent: "yes",
  };
  return Object.fromEntries(Object.entries(body).filter(([, value]) => value !== ""));
}

export async function sendLeadWebhook(lead: LeadPayload) {
  const url = webhookUrl();
  if (!url.startsWith("https://services.leadconnectorhq.com/hooks/")) {
    throw new Error("The CRM webhook is not configured.");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ghlBody(lead)),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail.slice(0, 280) || "The CRM webhook rejected the lead.");
  }
}
