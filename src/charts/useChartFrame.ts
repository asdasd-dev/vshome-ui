import { useLayoutEffect, useRef, useState, type RefObject } from "react";

export const CHART_H = 170;
export const PAD = { L: 40, R: 12, T: 10, B: 22 } as const;

export function useWidth(): [RefObject<HTMLDivElement | null>, number] {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => { if (e) setWidth(Math.round(e.contentRect.width)); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
}

export type TipPos = { px: number; boxW: number; gap: number };

// подсказка не вылезает за правый край графика: её ширина известна только после отрисовки
export function useTipLeft(pos: TipPos | null) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !pos) return;
    el.style.left = `${Math.min(pos.boxW - el.offsetWidth, Math.max(0, pos.px + pos.gap))}px`;
  });
  return ref;
}

export function pointerX(ev: React.MouseEvent | React.TouchEvent, svg: SVGSVGElement): { px: number; boxW: number } {
  const r = svg.getBoundingClientRect();
  const clientX = "touches" in ev ? (ev.touches[0]?.clientX ?? 0) : ev.clientX;
  return { px: clientX - r.left, boxW: r.width };
}
