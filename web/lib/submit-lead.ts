import type { LeadSubject } from "@/lib/lead";

export async function submitLead(subject: LeadSubject, form: HTMLFormElement) {
  const data = new FormData(form);
  const fields: Record<string, string> = {};
  for (const [name, raw] of data.entries()) {
    if (name === "consent" || name === "fax") continue;
    fields[name] = String(raw).trim();
  }

  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject,
      fields,
      consent: data.get("consent") === "yes",
      fax: String(data.get("fax") ?? ""),
    }),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(body?.error || "The note could not be sent.");
  }
}
