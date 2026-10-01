type Listener = (e: { matches: boolean }) => void;

const listeners = new Set<Listener>();
let mobile = false;

const matches = (query: string) => (query.includes("max-width: 760px") ? mobile : false);

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
