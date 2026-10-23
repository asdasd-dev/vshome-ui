import { useEffect, useRef, useState } from "react";
import { useRangeGesture } from "./useRangeGesture";

export type RangeCommitOptions = { min: number; max: number; step: number; vertical?: boolean; disabled?: boolean };

export function useRangeCommit(value: number, onCommit: (v: number) => void, range: RangeCommitOptions) {
  const [v, setV] = useState(value);
  const current = useRef(value);
  const dragging = useRef(false);
  const sent = useRef(value);
  useEffect(() => {
    sent.current = value;
    if (!dragging.current) { current.current = value; setV(value); }
  }, [value]);
  const set = (n: number) => { dragging.current = true; current.current = n; setV(n); };
  const commit = () => {
    dragging.current = false;
    if (current.current === sent.current) return;
    sent.current = current.current;
    onCommit(current.current);
  };
  const track = useRangeGesture({ ...range, onMove: set, onEnd: commit });
  const input = { value: v, onChange: (e: { target: { value: string } }) => set(Number(e.target.value)), onKeyUp: commit, onBlur: commit };
  return { v, input, track };
}
