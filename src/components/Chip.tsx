import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type ChipProps = { pressed?: boolean; onClick?: () => void; children: ReactNode; className?: string; title?: string };

export function Chip({ pressed, onClick, children, className, title }: ChipProps) {
  return (
    <button type="button" className={cx("vs-chip", className)} aria-pressed={pressed === undefined ? undefined : pressed} onClick={onClick} title={title}>
      {children}
    </button>
  );
}
