import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type ControlListProps = { children: ReactNode; className?: string };

export function ControlList({ children, className }: ControlListProps) {
  return <ul className={cx("vs-control-list", className)}>{children}</ul>;
}

export type ControlRowProps = { label: ReactNode; control: ReactNode; children?: ReactNode; inline?: boolean; className?: string };

export function ControlRow({ label, control, children, inline, className }: ControlRowProps) {
  const extra = children && <div className="vs-control-row__extra">{children}</div>;
  return (
    <li className={cx("vs-control-row", inline && "vs-control-row--inline", className)}>
      <span className="vs-control-row__label">{label}</span>
      {inline && extra}
      <span className="vs-control-row__control">{control}</span>
      {!inline && extra}
    </li>
  );
}
