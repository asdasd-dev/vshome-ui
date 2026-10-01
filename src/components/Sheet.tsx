import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "../utils/cx";

export type SheetProps = {
  open: boolean;
  onRequestClose: () => boolean | void;
  head: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  scrollKey?: unknown;
  className?: string;
};

export function Sheet({ open, onRequestClose, head, actions, footer, children, scrollKey, className }: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const body = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  useEffect(() => { if (body.current) body.current.scrollTop = 0; }, [scrollKey]);
  return (
    <dialog
      ref={ref}
      className={cx("vs-sheet", className)}
      onCancel={(e) => { e.preventDefault(); onRequestClose(); }}
    >
      <header className="vs-sheet__head">
        <span className="vs-sheet__title">{head}</span>
        <span className="vs-sheet__actions">
          {actions}
          <button type="button" className="vs-sheet__close" aria-label="Закрыть" onClick={() => onRequestClose()}>✕</button>
        </span>
      </header>
      <div ref={body} className="vs-sheet__body">{children}</div>
      {footer != null && <footer className="vs-sheet__foot">{footer}</footer>}
    </dialog>
  );
}
