import { useEffect, useRef, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

export type SplitButtonProps = {
  children: ReactNode;
  onClick: () => void;
  onHold?: () => void;
  holdMs?: number;
  pressed?: boolean;
  icon?: IconName;
  indicator?: "lamp";
  disabled?: boolean;
  more: { label: string; onClick: () => void; icon?: IconName };
  className?: string;
};

export function SplitButton({ children, onClick, onHold, holdMs = 500, pressed, icon, indicator, disabled, more, className }: SplitButtonProps) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const held = useRef(false);
  const stop = () => clearTimeout(timer.current);
  useEffect(() => stop, []);
  const start = () => {
    held.current = false;
    if (onHold) timer.current = setTimeout(() => { held.current = true; onHold(); }, holdMs);
  };
  const click = () => {
    if (held.current) { held.current = false; return; }
    onClick();
  };
  return (
    <span className={cx("vs-split", indicator && `vs-split--${indicator}`, className)} data-pressed={pressed || undefined}>
      <button type="button" className="vs-split__main" aria-pressed={pressed} disabled={disabled} onClick={click}
              onPointerDown={start} onPointerUp={stop} onPointerLeave={stop} onPointerCancel={stop}
              onContextMenu={onHold ? (e) => e.preventDefault() : undefined}>
        {indicator === "lamp" && pressed && <Icon name="dot" size="md" tone="lamp" className="vs-split__lamp" />}
        {icon && <Icon name={icon} size="sm" />}
        {children}
      </button>
      <button type="button" className="vs-split__more" aria-label={more.label} title={more.label} aria-haspopup="dialog" disabled={disabled} onClick={more.onClick}>
        <Icon name={more.icon ?? "chevron-right"} size="md" />
      </button>
    </span>
  );
}
