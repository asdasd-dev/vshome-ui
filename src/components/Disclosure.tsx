import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";

export type DisclosureProps = { summary: ReactNode; children: ReactNode; open?: boolean; onToggle?: (open: boolean) => void; tone?: "default" | "muted"; className?: string };

export function Disclosure({ summary, children, open, onToggle, tone = "default", className }: DisclosureProps) {
  return (
    <details className={cx("vs-disclosure", `vs-disclosure--${tone}`, className)} open={open} onToggle={onToggle ? (e) => onToggle(e.currentTarget.open) : undefined}>
      <summary className="vs-disclosure__summary"><Icon name="chevron-right" size="sm" className="vs-disclosure__chevron" />{summary}</summary>
      <div className="vs-disclosure__body">{children}</div>
    </details>
  );
}
