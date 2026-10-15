import { useMediaQuery } from "./hooks/useMediaQuery";

export const BREAKPOINTS = { tablet: 760, desktop: 1200 } as const;

export const MEDIA = {
  phone: "(max-width: 759px)",
  tablet: "(min-width: 760px) and (max-width: 1199px)",
  desktop: "(min-width: 1200px)",
  tabletUp: "(min-width: 760px)",
  touch: "(pointer: coarse)",
  hover: "(hover: hover)",
} as const;

export type Breakpoint = "phone" | "tablet" | "desktop";
export type Responsive<T> = T | { phone?: T; tablet?: T; desktop?: T };

export function useBreakpoint(): Breakpoint {
  const desktop = useMediaQuery(MEDIA.desktop);
  const tablet = useMediaQuery(MEDIA.tabletUp);
  return desktop ? "desktop" : tablet ? "tablet" : "phone";
}

export function responsiveVars<T extends string | number>(name: string, value: Responsive<T> | undefined): Record<string, string> {
  if (value == null) return {};
  if (typeof value !== "object") return { [`--${name}`]: String(value) };
  const out: Record<string, string> = {};
  if (value.phone != null) out[`--${name}`] = String(value.phone);
  if (value.tablet != null) out[`--${name}-tablet`] = String(value.tablet);
  if (value.desktop != null) out[`--${name}-desktop`] = String(value.desktop);
  return out;
}
