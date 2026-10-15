import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Shown = { text: string; id: number };

const ToastContext = createContext<((text: string) => void) | null>(null);

export type ToastProviderProps = { children: ReactNode; duration?: number; className?: string };

export function ToastProvider({ children, duration = 3500, className }: ToastProviderProps) {
  const [shown, setShown] = useState<Shown | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const show = useCallback((text: string) => {
    clearTimeout(timer.current);
    setShown((prev) => ({ text, id: (prev?.id ?? 0) + 1 }));
    timer.current = setTimeout(() => setShown(null), duration);
  }, [duration]);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      {shown && createPortal(<div className={className ? `vs-toast ${className}` : "vs-toast"} role="status" key={shown.id}>{shown.text}</div>, document.body)}
    </ToastContext.Provider>
  );
}

export function useToast(): (text: string) => void {
  const show = useContext(ToastContext);
  if (!show) throw new Error("useToast вне ToastProvider");
  return show;
}
