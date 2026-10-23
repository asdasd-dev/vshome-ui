import { useEffect, useRef, useState } from "react";

export const ACTION_FAILED_MS = 2_000;

const isThenable = (v: unknown): v is PromiseLike<unknown> => !!v && typeof (v as PromiseLike<unknown>).then === "function";

export function useAction<A extends unknown[]>(handler: ((...args: A) => unknown) | undefined) {
  const [inFlight, setInFlight] = useState(0);
  const [failed, setFailed] = useState(false);
  const alive = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    alive.current = true;
    return () => { alive.current = false; clearTimeout(timer.current); };
  }, []);
  const fail = () => {
    if (!alive.current) return;
    setFailed(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { if (alive.current) setFailed(false); }, ACTION_FAILED_MS);
  };
  const run = (...args: A) => {
    if (!handler) return;
    const r = handler(...args);
    if (!isThenable(r)) return;
    setInFlight((n) => n + 1);
    setFailed(false);
    Promise.resolve(r).then((v) => { if (v === false) fail(); }, fail).finally(() => {
      if (alive.current) setInFlight((n) => n - 1);
    });
  };
  return { run, pending: inFlight > 0, failed };
}
