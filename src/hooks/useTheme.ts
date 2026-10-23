import { useCallback, useEffect, useLayoutEffect, useSyncExternalStore } from "react";
import { storage } from "./useLocalStorage";
import { useMediaQuery } from "./useMediaQuery";
import { SYSTEM_DARK, THEME_DEFAULTS, type ThemeChoice, type ThemeConfig } from "../node/theme-boot";

export { themeBootScript, type ThemeChoice, type ThemeConfig } from "../node/theme-boot";
export type ThemeOptions = ThemeConfig & { themeColor?: { light: string; dark: string } };

const listeners = new Set<() => void>();
const isChoice = (v: string | null): v is ThemeChoice => v === "light" || v === "dark" || v === "system";

export function readTheme({ key = THEME_DEFAULTS.key, fallback = THEME_DEFAULTS.fallback }: ThemeConfig = {}): ThemeChoice {
  const v = storage.get(key, "");
  return isChoice(v) ? v : fallback;
}

export function useTheme({ key = THEME_DEFAULTS.key, fallback = THEME_DEFAULTS.fallback, themeColor }: ThemeOptions = {}) {
  const subscribe = useCallback((notify: () => void) => { listeners.add(notify); return () => { listeners.delete(notify); }; }, []);
  const choice = useSyncExternalStore(subscribe, () => readTheme({ key, fallback }), () => fallback);
  const systemDark = useMediaQuery(SYSTEM_DARK);
  const resolved: "light" | "dark" = choice === "system" ? (systemDark ? "dark" : "light") : choice;
  useLayoutEffect(() => { document.documentElement.dataset.theme = resolved; }, [resolved]);
  useEffect(() => {
    if (!themeColor) return;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "theme-color"; document.head.appendChild(meta); }
    meta.content = themeColor[resolved];
  }, [resolved, themeColor?.light, themeColor?.dark]);
  const set = useCallback((next: ThemeChoice) => { storage.set(key, next); for (const l of listeners) l(); }, [key]);
  return { choice, set, resolved };
}
