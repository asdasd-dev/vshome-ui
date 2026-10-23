import { useEffect, useRef, useState } from "react";

export const ACTION_FAILED_MS = 2_000;

const isThenable = (v: unknown): v is PromiseLike<unknown> => !!v && typeof (v as PromiseLike<unknown>).then === "function";

export function useAction<A extends unknown[]>(handler: ((...args: A) => unknown) | undefined) {
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const busy = useRef(false);
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
    if (busy.current || !handler) return;
    const r = handler(...args);
    if (!isThenable(r)) return;
    busy.current = true;
    setPending(true);
    setFailed(false);
    Promise.resolve(r).then((v) => { if (v === false) fail(); }, fail).finally(() => {
      busy.current = false;
      if (alive.current) setPending(false);
    });
  };
  return { run, pending, failed };
}
