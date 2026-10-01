import { useEffect, useRef, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Drawer } from "@base-ui/react/drawer";
import { cx } from "../utils/cx";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useAndroidBack } from "../hooks/useAndroidBack";

export const SHEET_MOBILE = "(max-width: 760px)";

export function sheetOpenChange(onRequestClose: () => boolean | void) {
  return (next: boolean, details: { cancel: () => void }) => {
    if (next) return;
    if (onRequestClose() === false) details.cancel();
  };
}

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
  const mobile = useMediaQuery(SHEET_MOBILE);
  const body = useRef<HTMLDivElement>(null);
  useEffect(() => { if (body.current) body.current.scrollTop = 0; }, [scrollKey]);
  const inFlight = useRef(false);
  const lastResult = useRef<boolean | void>(undefined);
  const latest = useRef(onRequestClose);
  latest.current = onRequestClose;
  // сгруппированные CloseWatcher срабатывают от одного «Назад» вместе
  const requestClose = useRef(() => {
    if (inFlight.current) return lastResult.current;
    inFlight.current = true;
    setTimeout(() => { inFlight.current = false; }, 0);
    lastResult.current = latest.current();
    return lastResult.current;
  }).current;
  useAndroidBack(open, requestClose);
  const onOpenChange = sheetOpenChange(requestClose);
  const Parts = mobile ? Drawer : Dialog;
  const frame = (
    <>
      <header className="vs-sheet__head">
        <Parts.Title className="vs-sheet__title">{head}</Parts.Title>
        <span className="vs-sheet__actions">
          {actions}
          <Parts.Close className="vs-sheet__close" aria-label="Закрыть">✕</Parts.Close>
        </span>
      </header>
      <div ref={body} className="vs-sheet__body">{children}</div>
      {footer != null && <footer className="vs-sheet__foot">{footer}</footer>}
    </>
  );
  if (mobile) {
    return (
      <Drawer.Root open={open} onOpenChange={onOpenChange}>
        <Drawer.VirtualKeyboardProvider>
          <Drawer.Portal>
            <Drawer.Backdrop className="vs-sheet-backdrop" />
            <Drawer.Viewport className="vs-sheet-viewport">
              <Drawer.Popup className={cx("vs-sheet", "vs-sheet--drawer", className)}>
                <span className="vs-sheet__grip" aria-hidden="true" />
                <Drawer.Content className="vs-sheet__content">{frame}</Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        </Drawer.VirtualKeyboardProvider>
      </Drawer.Root>
    );
  }
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="vs-sheet-backdrop" />
        <Dialog.Popup className={cx("vs-sheet", className)}>{frame}</Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
