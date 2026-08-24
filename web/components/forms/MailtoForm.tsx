"use client";

import { FormEvent, ReactNode, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SITE_EMAIL } from "@/lib/site";

type Props = {
  id: string;
  subject: string;
  children: ReactNode;
  websiteFromQuery?: boolean;
};

export function MailtoForm({ id, subject, children, websiteFromQuery }: Props) {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!websiteFromQuery) return;
    const url = params.get("url");
    const field = formRef.current?.elements.namedItem("website") as HTMLInputElement | null;
    if (url && field) field.value = url;
  }, [params, websiteFromQuery]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const first = String(data.get("firstName") ?? "").trim();
    const last = String(data.get("lastName") ?? "").trim();
    const lines = [
      `Name: ${`${first} ${last}`.trim()}`,
      `Email: ${data.get("email") ?? ""}`,
      `Phone: ${data.get("phone") ?? ""}`,
      `Business: ${data.get("business") ?? ""}`,
    ];
    const website = data.get("website");
    const message = data.get("message");
    if (website) lines.push(`Website: ${website}`);
    if (message) lines.push("", "Message:", String(message));
    window.location.href = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <form className="lead-form" id={id} ref={formRef} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
