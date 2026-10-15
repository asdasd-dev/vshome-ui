import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";

export type BannerProps = { tone?: "warn" | "danger" | "muted"; truncate?: boolean; children: ReactNode; className?: string };

export function Banner({ tone = "warn", truncate, children, className }: BannerProps) {
  return (
    <div role="status" className={cx("vs-banner", `vs-banner--${tone}`, truncate && "vs-banner--truncate", className)}>
      <Icon name="alert" size="sm" /><span className="vs-banner__text">{children}</span>
    </div>
  );
}
