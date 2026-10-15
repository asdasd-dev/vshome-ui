import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

export type EmptyStateProps = { title?: ReactNode; children?: ReactNode; action?: ReactNode; icon?: IconName; size?: "sm" | "md"; className?: string };

export function EmptyState({ title, children, action, icon, size = "md", className }: EmptyStateProps) {
  return (
    <div className={cx("vs-empty", `vs-empty--${size}`, className)}>
      {icon && <Icon name={icon} size="lg" className="vs-empty__icon" />}
      {title && <p className="vs-empty__title">{title}</p>}
      {children && <div className="vs-empty__text">{children}</div>}
      {action && <div className="vs-empty__action">{action}</div>}
    </div>
  );
}
