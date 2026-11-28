import { useEffect, useRef, type KeyboardEvent, type ReactNode, type TouchEvent } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Drawer } from "@base-ui/react/drawer";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { hasOpenPopup } from "../utils/openPopups";
import { useAndroidBack } from "../hooks/useAndroidBack";

export const SHEET_MOBILE = "(max-width: 759px)";

export function sheetOpenChange(onRequestClose: () => boolean | void) {
  return (next: boolean, details: { cancel: () => void; reason?: string }) => {
    if (next) return;
    // Select закрывается на pointerdown, Dialog/Drawer — на click того же нажатия: к click список уже закрыт, но лист закрываться не должен
    if (details.reason === "outside-press" && hasOpenPopup()) {
      details.cancel();
      return;
    }
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
  /** на телефоне — по высоте содержимого, а не во весь экран */
  fit?: boolean;
};

const FOCUSABLE = "a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex=\"-1\"])";

function trapSheetTab(e: KeyboardEvent<HTMLElement>, container: HTMLElement | null) {
  if (e.key !== "Tab" || !container) return;
  const list = [...container.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => {
    if (el.closest("[hidden],[inert]") || el.tabIndex < 0) return false;
    const cs = getComputedStyle(el);
    return cs.display !== "none" && cs.visibility !== "hidden";
  });
  if (list.length === 0) {
    e.preventDefault();
    container.focus();
    return;
  }
  const first = list[0]!;
  const last = list[list.length - 1]!;
  const active = document.activeElement;
  if (e.shiftKey) {
    if (active === first || active === container || !container.contains(active)) {
      e.preventDefault();
      last.focus();
    }
  } else if (active === last || !container.contains(active)) {
    e.preventDefault();
    first.focus();
  }
}

export function Sheet({ open, onRequestClose, head, actions, footer, children, scrollKey, className, fit }: SheetProps) {
  const mobile = useMediaQuery(SHEET_MOBILE);
  const body = useRef<HTMLDivElement>(null);
  const popup = useRef<HTMLDivElement>(null);
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
  // отменённый touchend не даёт браузеру прислать click: фон к нему уже без pointer-events, и click попал бы в элемент под листом
  const onBackdropTouchEnd = (e: TouchEvent) => { e.preventDefault(); requestClose(); };
  const Parts = mobile ? Drawer : Dialog;
  const frame = (
    <>
      <header className="vs-sheet__head">
        <Parts.Title className="vs-sheet__title">{head}</Parts.Title>
        <span className="vs-sheet__actions">
          {actions}
          <Parts.Close className="vs-sheet__close" aria-label="Закрыть"><Icon name="close" size="md" /></Parts.Close>
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
            <Drawer.Backdrop className="vs-sheet-backdrop" onTouchEnd={onBackdropTouchEnd} />
            <Drawer.Viewport className="vs-sheet-viewport">
              <Drawer.Popup ref={popup} aria-modal="true" onKeyDown={(e) => trapSheetTab(e, popup.current)} className={cx("vs-sheet", "vs-sheet--drawer", fit && "vs-sheet--fit", className)}>
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
        <Dialog.Backdrop className="vs-sheet-backdrop" onTouchEnd={onBackdropTouchEnd} />
        <Dialog.Popup ref={popup} aria-modal="true" onKeyDown={(e) => trapSheetTab(e, popup.current)} className={cx("vs-sheet", className)}>{frame}</Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
