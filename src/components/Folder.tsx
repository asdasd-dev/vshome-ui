import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { cx } from "../utils/cx";
import { useAndroidBack } from "../hooks/useAndroidBack";

export type FolderProps = {
  title: string; trigger: ReactNode; children: ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void;
  label?: string; tooltip?: string; className?: string; panelClassName?: string;
};

type Origin = { "--vs-folder-dx": string; "--vs-folder-dy": string; "--vs-folder-s": string };

function originOf(el: HTMLElement | null): Origin | undefined {
  if (!el) return undefined;
  const r = el.getBoundingClientRect();
  const panel = Math.min(window.innerWidth * 0.85, 432);
  return {
    "--vs-folder-dx": `${Math.round(r.left + r.width / 2 - window.innerWidth / 2)}px`,
    "--vs-folder-dy": `${Math.round(r.top + r.height / 2 - window.innerHeight / 2)}px`,
    "--vs-folder-s": String(Math.min(1, Math.max(0.1, r.width / panel)).toFixed(3)),
  };
}

export function Folder({ title, trigger, children, open, onOpenChange, label, tooltip, className, panelClassName }: FolderProps) {
  const [inner, setInner] = useState(false);
  const shown = open ?? inner;
  const anchor = useRef<HTMLButtonElement>(null);
  const [origin, setOrigin] = useState<Origin | undefined>(undefined);
  const change = (next: boolean) => {
    setOrigin(originOf(anchor.current));
    if (open === undefined) setInner(next);
    onOpenChange?.(next);
  };
  useAndroidBack(shown, () => change(false));
  return (
    <Dialog.Root open={shown} onOpenChange={(next) => change(next)}>
      <Dialog.Trigger ref={anchor} className={cx("vs-card", "vs-card--default", "vs-card--pad-none", "vs-card--interactive", "vs-folder-trigger", className)} aria-label={label} title={tooltip}>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="vs-folder-backdrop" />
        <Dialog.Popup aria-modal="true" className={cx("vs-folder", panelClassName)} style={origin as CSSProperties | undefined}>
          <Dialog.Title className="vs-folder__title">{title}</Dialog.Title>
          <div className="vs-folder__body">{children}</div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
