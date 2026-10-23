import { useRef, type PointerEvent } from "react";

export const RANGE_SLOP = 8;

export type RangeGestureOptions = {
  min: number; max: number; step: number; vertical?: boolean; disabled?: boolean;
  onMove: (v: number) => void; onEnd: () => void;
};

type Touch = { id: number; x: number; y: number; drag: boolean };

export function useRangeGesture({ min, max, step, vertical, disabled, onMove, onEnd }: RangeGestureOptions) {
  const touch = useRef<Touch | null>(null);
  const valueAt = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const size = vertical ? r.height : r.width;
    const f = size > 0 ? (vertical ? r.bottom - e.clientY : e.clientX - r.left) / size : 0;
    const raw = min + Math.min(1, Math.max(0, f)) * (max - min);
    return Math.min(max, Math.max(min, min + Math.round((raw - min) / step) * step));
  };
  const drag = (e: PointerEvent<HTMLElement>) => {
    touch.current!.drag = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    onMove(valueAt(e));
  };
  return {
    onPointerDown: (e: PointerEvent<HTMLElement>) => {
      if (disabled || e.button > 0) return;
      touch.current = { id: e.pointerId, x: e.clientX, y: e.clientY, drag: false };
      if (e.pointerType === "mouse") drag(e);
    },
    onPointerMove: (e: PointerEvent<HTMLElement>) => {
      const t = touch.current;
      if (!t || t.id !== e.pointerId) return;
      if (t.drag) { onMove(valueAt(e)); return; }
      const dx = Math.abs(e.clientX - t.x), dy = Math.abs(e.clientY - t.y);
      const along = vertical ? dy : dx, across = vertical ? dx : dy;
      if (along > RANGE_SLOP && along >= across) drag(e);
      else if (across > RANGE_SLOP) touch.current = null;
    },
    onPointerUp: (e: PointerEvent<HTMLElement>) => {
      const t = touch.current;
      if (!t || t.id !== e.pointerId) return;
      touch.current = null;
      if (!t.drag) onMove(valueAt(e));
      onEnd();
    },
    onPointerCancel: () => {
      const t = touch.current;
      touch.current = null;
      if (t?.drag) onEnd();
    },
  };
}
