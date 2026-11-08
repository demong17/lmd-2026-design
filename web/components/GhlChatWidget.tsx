"use client";

import { useEffect } from "react";

const WIDGET_ID = "6abaebfa2b6d9dcee80a1912";
const LOADER_SRC = "https://widgets.leadconnectorhq.com/loader.js";
const RESOURCES_URL = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
const SCRIPT_ID = "lmd-ghl-chat";

function injectWidget() {
  if (document.getElementById(SCRIPT_ID)) return;
  const script = document.createElement("script");
  script.id = SCRIPT_ID;
  script.src = LOADER_SRC;
  script.async = true;
  script.dataset.resourcesUrl = RESOURCES_URL;
  script.dataset.widgetId = WIDGET_ID;
  script.dataset.source = "WEB_USER";
  document.body.appendChild(script);
}

export function GhlChatWidget() {
  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const run = () => {
      if (cancelled) return;
      timer = window.setTimeout(() => {
        if (!cancelled) injectWidget();
      }, 2200);
    };

    if (document.readyState === "complete") run();
    else window.addEventListener("load", run, { once: true });

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  return null;
}
