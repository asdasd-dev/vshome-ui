import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";

export type BannerProps = {
  tone?: "warn" | "danger" | "muted" | "accent" | "ok"; variant?: "inline" | "box"; title?: ReactNode; action?: ReactNode;
  truncate?: boolean; children: ReactNode; className?: string;
};

const ICON = { warn: "alert", danger: "alert", muted: "alert", accent: "info", ok: "check" } as const;

export function Banner({ tone = "warn", variant = "inline", title, action, truncate, children, className }: BannerProps) {
  return (
    <div role="status" className={cx("vs-banner", `vs-banner--${tone}`, variant === "box" && "vs-banner--box", truncate && "vs-banner--truncate", className)}>
      <Icon name={ICON[tone]} size="sm" />
      {title ? <span className="vs-banner__body"><span className="vs-banner__title">{title}</span><span className="vs-banner__text">{children}</span></span> : <span className="vs-banner__text">{children}</span>}
      {action && <span className="vs-banner__action">{action}</span>}
    </div>
  );
}
