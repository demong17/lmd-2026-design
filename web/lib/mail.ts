import { readFileSync } from "fs";
import { join } from "path";
import { SITE_EMAIL } from "@/lib/site";
import { leadText, type LeadPayload } from "@/lib/lead";

type MailFile = {
  RESEND_API_KEY?: string;
  MAIL_TO?: string;
  MAIL_FROM?: string;
};

function fileConfig(): MailFile {
  try {
    return JSON.parse(readFileSync(join(process.cwd(), "resend.config.json"), "utf8")) as MailFile;
  } catch {
    return {};
  }
}

export async function sendLeadMail(lead: LeadPayload) {
  const file = fileConfig();
  const key = process.env.RESEND_API_KEY || file.RESEND_API_KEY || "";
  const to = process.env.MAIL_TO || file.MAIL_TO || SITE_EMAIL;
  const from = process.env.MAIL_FROM || file.MAIL_FROM || "info@lmdhealth.com";
  if (!key.startsWith("re_")) {
    throw new Error("Mail is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `Live Media Digital <${from}>`,
      to: [to],
      reply_to: lead.email,
      subject: lead.subject,
      text: leadText(lead),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail.slice(0, 280) || "Resend rejected the message.");
  }
}
