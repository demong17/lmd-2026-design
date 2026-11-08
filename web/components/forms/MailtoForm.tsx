"use client";

import { FormEvent, ReactNode, Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ContactConsent } from "@/components/forms/ContactConsent";
import type { LeadSubject } from "@/lib/lead";
import { submitLead } from "@/lib/submit-lead";

type Props = {
  id: string;
  subject: LeadSubject;
  children: ReactNode;
  websiteFromQuery?: boolean;
};

function MailtoFormFields({ id, subject, children, websiteFromQuery }: Props) {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!websiteFromQuery) return;
    const url = params.get("url");
    const field = formRef.current?.elements.namedItem("website") as HTMLInputElement | null;
    if (url && field) field.value = url;
  }, [params, websiteFromQuery]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("pending");
    setError("");
    try {
      await submitLead(subject, form);
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "The note could not be sent. Call (305) 918-2306 and try again.");
    }
  };

  if (status === "success") {
    return (
      <p className="form-status" data-tone="success" role="status">
        Sent. We will follow up by email.
      </p>
    );
  }

  return (
    <form className="lead-form" id={id} ref={formRef} onSubmit={onSubmit} data-pending={status === "pending" ? "true" : undefined} noValidate>
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor={`${id}-fax`}>Company</label>
        <input id={`${id}-fax`} name="fax" tabIndex={-1} autoComplete="off" />
      </div>
      {children}
      <ContactConsent id={`${id}-consent`} />
      <p className="form-status" data-tone={status} role="status">
        {status === "pending" ? "Sending." : status === "error" ? error : null}
      </p>
    </form>
  );
}

export function MailtoForm(props: Props) {
  return (
    <Suspense fallback={<form className="lead-form" id={props.id}>{props.children}</form>}>
      <MailtoFormFields {...props} />
    </Suspense>
  );
}
