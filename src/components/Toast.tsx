import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Shown = { text: string; host: Element; id: number };

const ToastContext = createContext<((text: string) => void) | null>(null);

function topHost(): Element {
  const open = document.querySelectorAll("dialog[open]");
  return open.length ? open[open.length - 1]! : document.body;
}

export function ToastProvider({ children, duration = 3500 }: { children: ReactNode; duration?: number }) {
  const [shown, setShown] = useState<Shown | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const show = useCallback((text: string) => {
    clearTimeout(timer.current);
    setShown((prev) => ({ text, host: topHost(), id: (prev?.id ?? 0) + 1 }));
    timer.current = setTimeout(() => setShown(null), duration);
  }, [duration]);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      {shown && createPortal(<div className="vs-toast" role="status">{shown.text}</div>, shown.host)}
    </ToastContext.Provider>
  );
}

export function useToast(): (text: string) => void {
  const show = useContext(ToastContext);
  if (!show) throw new Error("useToast вне ToastProvider");
  return show;
}
