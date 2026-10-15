import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";

export type BannerProps = { tone?: "warn" | "danger" | "muted"; children: ReactNode; className?: string };

export function Banner({ tone = "warn", children, className }: BannerProps) {
  return (
    <div role="status" className={cx("vs-banner", `vs-banner--${tone}`, className)}>
      <Icon name="alert" size="sm" />{children}
    </div>
  );
}
