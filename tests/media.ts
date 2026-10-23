type Listener = (e: { matches: boolean }) => void;

const listeners = new Set<Listener>();
let mobile = false;
let dark = false;

const matches = (query: string) => (query.includes("prefers-color-scheme: dark") ? dark : query.includes("max-width: 759px") ? mobile : query.includes("min-width") ? !mobile : false);

export function installMatchMedia(): void {
  window.matchMedia = (query: string) =>
    ({
      media: query,
      get matches() { return matches(query); },
      addEventListener: (_: string, l: Listener) => listeners.add(l),
      removeEventListener: (_: string, l: Listener) => listeners.delete(l),
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

export function setMobile(next: boolean): void {
  mobile = next;
  for (const l of listeners) l({ matches: next });
}

export function setSystemDark(next: boolean): void {
  dark = next;
  for (const l of listeners) l({ matches: next });
}
