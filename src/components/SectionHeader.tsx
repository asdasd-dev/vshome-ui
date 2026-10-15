import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { Badge } from "./Badge";

export type SectionHeaderProps = { title: ReactNode; count?: number | string; countTone?: "muted" | "accent" | "warn" | "danger"; countLabel?: string; aside?: ReactNode; as?: "h2" | "h3" | "h4"; className?: string };

export function SectionHeader({ title, count, countTone = "muted", countLabel, aside, as: Tag = "h2", className }: SectionHeaderProps) {
  return (
    <div className={cx("vs-section-header", className)}>
      <Tag className="vs-section-header__title">{title}{count != null && <Badge tone={countTone} label={countLabel}>{count}</Badge>}</Tag>
      {aside && <span className="vs-section-header__aside">{aside}</span>}
    </div>
  );
}
