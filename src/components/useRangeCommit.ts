import { useEffect, useRef, useState } from "react";

export function useRangeCommit(value: number, onCommit: (v: number) => void) {
  const [v, setV] = useState(value);
  const dragging = useRef(false);
  const sent = useRef(value);
  useEffect(() => {
    sent.current = value;
    if (!dragging.current) setV(value);
  }, [value]);
  const commit = () => {
    dragging.current = false;
    if (v === sent.current) return;
    sent.current = v;
    onCommit(v);
  };
  const input = {
    value: v,
    onPointerDown: () => { dragging.current = true; },
    onChange: (e: { target: { value: string } }) => setV(Number(e.target.value)),
    onPointerUp: commit, onPointerCancel: commit, onKeyUp: commit, onTouchEnd: commit,
  };
  return { v, input };
}
