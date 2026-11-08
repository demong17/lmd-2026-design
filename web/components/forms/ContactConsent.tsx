import Link from "next/link";
import { CONSENT_COPY } from "@/lib/consent-copy";

export function ContactConsent({ id }: { id: string }) {
  return (
    <div className="form-consent">
      <input id={id} name="consent" type="checkbox" value="yes" required />
      <label htmlFor={id}>
        {CONSENT_COPY}{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>
        {" and "}
        <Link href="/terms-of-service">Terms</Link>.
      </label>
    </div>
  );
}
