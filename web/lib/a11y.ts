export const A11Y_STORAGE_KEY = "lmd-a11y";
export const A11Y_OPEN_EVENT = "lmd:open-a11y";

export type A11yTextScale = "default" | "large" | "xlarge";

export type A11yPrefs = {
  text: A11yTextScale;
  contrast: boolean;
  links: boolean;
  motion: boolean;
  readable: boolean;
  highlight: boolean;
};

const FLAGS = ["contrast", "links", "motion", "readable", "highlight"] as const;

export function defaultA11yPrefs(): A11yPrefs {
  return {
    text: "default",
    contrast: false,
    links: false,
    motion: false,
    readable: false,
    highlight: false,
  };
}

export function applyA11yPrefs(prefs: A11yPrefs) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  if (prefs.text === "default") root.removeAttribute("data-a11y-text");
  else root.setAttribute("data-a11y-text", prefs.text);

  for (const flag of FLAGS) {
    const attr = `data-a11y-${flag}`;
    if (prefs[flag]) root.setAttribute(attr, "on");
    else root.removeAttribute(attr);
  }

  if (prefs.motion) {
    document.querySelectorAll("video").forEach((video) => {
      video.pause();
      video.removeAttribute("autoplay");
    });
  }
}

export function readA11yPrefs(): A11yPrefs {
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return defaultA11yPrefs();
    const parsed = JSON.parse(raw) as Partial<A11yPrefs>;
    return { ...defaultA11yPrefs(), ...parsed };
  } catch {
    return defaultA11yPrefs();
  }
}

export function writeA11yPrefs(prefs: A11yPrefs) {
  localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
  applyA11yPrefs(prefs);
  return prefs;
}
