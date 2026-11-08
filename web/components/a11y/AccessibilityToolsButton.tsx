"use client";

import { A11Y_OPEN_EVENT } from "@/lib/a11y";

export function AccessibilityToolsButton({ children }: { children: string }) {
  return (
    <button className="link-btn" type="button" onClick={() => window.dispatchEvent(new Event(A11Y_OPEN_EVENT))}>
      {children}
    </button>
  );
}
