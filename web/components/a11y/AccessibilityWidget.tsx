"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  A11Y_OPEN_EVENT,
  applyA11yPrefs,
  defaultA11yPrefs,
  readA11yPrefs,
  writeA11yPrefs,
  type A11yPrefs,
  type A11yTextScale,
} from "@/lib/a11y";

const TEXT_STEPS: Array<{ value: A11yTextScale; label: string; hint: string }> = [
  { value: "default", label: "A", hint: "Default text size" },
  { value: "large", label: "A", hint: "Larger text" },
  { value: "xlarge", label: "A", hint: "Largest text" },
];

const TOGGLES: Array<{ key: Exclude<keyof A11yPrefs, "text">; label: string; help: string }> = [
  { key: "contrast", label: "High contrast", help: "Stronger colors for reading." },
  { key: "links", label: "Underline links", help: "Show every link with an underline." },
  { key: "motion", label: "Stop animations", help: "Pause motion and looping video." },
  { key: "readable", label: "Readable text", help: "More spacing and a simpler type style." },
  { key: "highlight", label: "Keyboard highlight", help: "Thicker outline on the focused control." },
];

export function AccessibilityWidget() {
  const pathname = usePathname();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(defaultA11yPrefs);

  useEffect(() => {
    const stored = readA11yPrefs();
    setPrefs(stored);
    applyA11yPrefs(stored);
  }, []);

  useEffect(() => {
    applyA11yPrefs(prefs);
  }, [pathname, prefs]);

  useEffect(() => {
    const openPanel = () => setOpen(true);
    window.addEventListener(A11Y_OPEN_EVENT, openPanel);
    return () => window.removeEventListener(A11Y_OPEN_EVENT, openPanel);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  const update = (next: A11yPrefs) => {
    setPrefs(writeA11yPrefs(next));
  };

  return (
    <div className={`a11y-widget${open ? " open" : ""}`} ref={panelRef}>
      <div className="a11y-panel" id="a11y-panel" role="dialog" aria-modal="false" aria-labelledby={titleId} hidden={!open}>
        <div className="a11y-panel-head">
          <div>
            <p className="a11y-kicker">Site tools</p>
            <h2 id={titleId}>Accessibility</h2>
          </div>
          <button type="button" className="a11y-close" aria-label="Close accessibility tools" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <p className="a11y-lead">Adjust how this site looks on your device. Settings stay on this browser.</p>

        <div className="a11y-group">
          <p className="a11y-group-label" id="a11y-text-label">
            Text size
          </p>
          <div className="a11y-text-steps" role="group" aria-labelledby="a11y-text-label">
            {TEXT_STEPS.map((step, index) => (
              <button
                key={step.value}
                type="button"
                className={`a11y-text-step${prefs.text === step.value ? " is-active" : ""}`}
                aria-pressed={prefs.text === step.value}
                aria-label={step.hint}
                onClick={() => update({ ...prefs, text: step.value })}
              >
                <span style={{ fontSize: `${15 + index * 4}px` }}>{step.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="a11y-toggles">
          {TOGGLES.map((item) => (
            <label className="a11y-toggle" key={item.key} htmlFor={`a11y-${item.key}`}>
              <span>
                <span className="a11y-toggle-label">{item.label}</span>
                <span className="a11y-toggle-help">{item.help}</span>
              </span>
              <input
                id={`a11y-${item.key}`}
                type="checkbox"
                checked={prefs[item.key]}
                onChange={(event) => update({ ...prefs, [item.key]: event.target.checked })}
              />
            </label>
          ))}
        </div>

        <div className="a11y-panel-foot">
          <button type="button" className="a11y-reset" onClick={() => update(defaultA11yPrefs())}>
            Reset
          </button>
          <Link href="/accessibility" className="a11y-statement" onClick={() => setOpen(false)}>
            Accessibility statement
          </Link>
        </div>
      </div>

      <button
        type="button"
        className="a11y-toggle-btn"
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label={open ? "Close accessibility tools" : "Open accessibility tools"}
        onClick={() => setOpen((value) => !value)}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <circle cx="12" cy="5" r="2.1" />
          <path d="M4.5 10.5h15M12 8.5v4.5M8 21l4-8 4 8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
