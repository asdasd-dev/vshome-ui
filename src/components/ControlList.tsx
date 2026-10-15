import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type ControlListProps = { children: ReactNode; className?: string };

export function ControlList({ children, className }: ControlListProps) {
  return <ul className={cx("vs-control-list", className)}>{children}</ul>;
}

export type ControlRowProps = { label: ReactNode; control: ReactNode; children?: ReactNode; className?: string };

export function ControlRow({ label, control, children, className }: ControlRowProps) {
  return (
    <li className={cx("vs-control-row", className)}>
      <span className="vs-control-row__label">{label}</span>
      <span className="vs-control-row__control">{control}</span>
      {children && <div className="vs-control-row__extra">{children}</div>}
    </li>
  );
}
