"use client";

export function CookieSettingsButton({ children }: { children: string }) {
  return (
    <button className="link-btn" type="button" onClick={() => window.dispatchEvent(new Event("lmd:open-cookies"))}>
      {children}
    </button>
  );
}
