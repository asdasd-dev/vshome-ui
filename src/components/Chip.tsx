import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { Badge } from "./Badge";

export type ChipProps = {
  children: ReactNode; pressed?: boolean; onClick?: () => void; href?: string; size?: "sm" | "md"; disabled?: boolean; count?: number;
  title?: string; className?: string;
};

export function Chip({ children, pressed, onClick, href, size = "md", disabled, count, title, className }: ChipProps) {
  const cls = cx("vs-chip", size === "sm" && "vs-chip--sm", className);
  const inner = <>{children}{count != null && <Badge tone={pressed ? "accent" : "muted"}>{count}</Badge>}</>;
  if (href != null) return <a className={cls} href={href} title={title} aria-current={pressed ? "page" : undefined}>{inner}</a>;
  return (
    <button type="button" className={cls} aria-pressed={pressed === undefined ? undefined : pressed} onClick={onClick} title={title} disabled={disabled}>
      {inner}
    </button>
  );
}

export type ChipGroupProps<T extends string> = {
  options: { value: T; label: ReactNode; count?: number }[]; value: T; onChange: (v: T) => void; label: string;
  scroll?: boolean; size?: "sm" | "md"; className?: string;
};

export function ChipGroup<T extends string>({ options, value, onChange, label, scroll, size, className }: ChipGroupProps<T>) {
  return (
    <div role="group" aria-label={label} className={cx("vs-chip-group", scroll && "vs-chip-group--scroll", className)}>
      {options.map((o) => <Chip key={o.value} size={size} pressed={o.value === value} count={o.count} onClick={() => onChange(o.value)}>{o.label}</Chip>)}
    </div>
  );
}
