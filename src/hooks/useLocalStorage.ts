import { useCallback, useState } from "react";

export const storage = {
  get(key: string, fallback: string): string {
    try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
  },
  set(key: string, value: string): void {
    // приватный режим и запрет cookies делают localStorage недоступным — тогда выбор просто не запоминается
    try { localStorage.setItem(key, value); } catch {}
  },
};

export function useLocalStorage(key: string, initial: string): [string, (v: string) => void] {
  const [value, setValue] = useState(() => storage.get(key, initial));
  const set = useCallback((v: string) => { setValue(v); storage.set(key, v); }, [key]);
  return [value, set];
}
