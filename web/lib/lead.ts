import { CONSENT_COPY } from "@/lib/consent-copy";

export const LEAD_SUBJECTS = [
  "New Contact Form Submission",
  "New Consultation Request",
  "New AI Visibility Report Request",
  "New Lead from Exit Popup",
] as const;

export type LeadSubject = (typeof LEAD_SUBJECTS)[number];

const FIELD_LABELS: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  fullName: "Full Name",
  email: "Email",
  business: "Business",
  website: "Website",
  message: "Message",
  lookingFor: "What are you looking for?",
  budget: "Monthly Marketing Budget",
  goals: "Tell us about your goals",
  source: "How did you hear about us?",
};

const BLOCK_FIELDS = new Set(["message", "goals"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadPayload = {
  subject: LeadSubject;
  email: string;
  fields: Record<string, string>;
  fax?: string;
};

function clip(value: unknown, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim()
    .slice(0, max);
}

export function parseLead(raw: unknown): { ok: true; lead: LeadPayload } | { ok: false; error: string } {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Send the form as JSON." };
  }

  const data = raw as Record<string, unknown>;
  const subject = LEAD_SUBJECTS.find((item) => item === data.subject);
  if (!subject) return { ok: false, error: "Unknown form." };

  if (clip(data.fax, 80)) {
    return { ok: true, lead: { subject, email: "honeypot@invalid", fields: {}, fax: "1" } };
  }

  if (data.consent !== true) {
    return { ok: false, error: "Agree to email before sending." };
  }

  const fieldsIn = data.fields;
  if (!fieldsIn || typeof fieldsIn !== "object") {
    return { ok: false, error: "Send the form as JSON." };
  }

  const fields: Record<string, string> = {};
  for (const [name, value] of Object.entries(fieldsIn as Record<string, unknown>)) {
    if (!/^[a-zA-Z][a-zA-Z0-9]{0,40}$/.test(name)) continue;
    const text = clip(value, name === "message" || name === "goals" ? 2000 : 200);
    if (text) fields[name] = text;
  }

  const email = clip(fields.email, 120).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Use a working email address." };
  }
  fields.email = email;

  return { ok: true, lead: { subject, email, fields } };
}

export function isHoneypot(lead: LeadPayload) {
  return Boolean(lead.fax);
}

export function leadText(lead: LeadPayload) {
  const fields = lead.fields;
  const fullName = fields.fullName ?? "";
  const first = fields.firstName ?? "";
  const last = fields.lastName ?? "";
  const skipped = new Set(["fullName", "firstName", "lastName", "email"]);
  const lines: string[] = [];

  if (fullName) lines.push(`Full Name: ${fullName}`);
  else if (first || last) lines.push(`Name: ${`${first} ${last}`.trim()}`);
  lines.push(`Email: ${lead.email}`);

  for (const [name, value] of Object.entries(fields)) {
    if (skipped.has(name)) continue;
    const label = FIELD_LABELS[name] ?? name;
    if (BLOCK_FIELDS.has(name)) lines.push("", `${label}:`, value);
    else lines.push(`${label}: ${value}`);
  }

  lines.push("", `Consent: accepted`, CONSENT_COPY, `Accepted at: ${new Date().toISOString()}`);
  return lines.join("\n");
}
