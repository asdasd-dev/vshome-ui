import { useCallback, useEffect, useSyncExternalStore } from "react";
import { storage } from "./useLocalStorage";
import { useMediaQuery } from "./useMediaQuery";

export type ThemeChoice = "light" | "dark" | "system";
export type ThemeOptions = { key?: string; fallback?: ThemeChoice; themeColor?: { light: string; dark: string } };

const listeners = new Set<() => void>();
const isChoice = (v: string | null): v is ThemeChoice => v === "light" || v === "dark" || v === "system";

export function readTheme(key = "vs-theme", fallback: ThemeChoice = "system"): ThemeChoice {
  const v = storage.get(key, "");
  return isChoice(v) ? v : fallback;
}

export function applyTheme(choice: ThemeChoice) {
  const root = document.documentElement;
  if (choice === "system") delete root.dataset.theme;
  else root.dataset.theme = choice;
}

export function themeBootScript(key = "vs-theme", fallback: ThemeChoice = "system"): string {
  return `try{var t=localStorage.getItem(${JSON.stringify(key)});if(t!=="light"&&t!=="dark"&&t!=="system")t=${JSON.stringify(fallback)};if(t!=="system")document.documentElement.dataset.theme=t}catch(e){${fallback === "system" ? "" : `document.documentElement.dataset.theme=${JSON.stringify(fallback)}`}}`;
}

export function useTheme({ key = "vs-theme", fallback = "system", themeColor }: ThemeOptions = {}) {
  const subscribe = useCallback((notify: () => void) => { listeners.add(notify); return () => { listeners.delete(notify); }; }, []);
  const value = useSyncExternalStore(subscribe, () => readTheme(key, fallback), () => fallback);
  const systemDark = useMediaQuery("(prefers-color-scheme: dark)");
  const resolved: "light" | "dark" = value === "system" ? (systemDark ? "dark" : "light") : value;
  useEffect(() => applyTheme(value), [value]);
  useEffect(() => {
    if (!themeColor) return;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "theme-color"; document.head.appendChild(meta); }
    meta.content = themeColor[resolved];
  }, [resolved, themeColor?.light, themeColor?.dark]);
  const set = useCallback((next: ThemeChoice) => { storage.set(key, next); for (const l of listeners) l(); }, [key]);
  return { value, set, resolved };
}
