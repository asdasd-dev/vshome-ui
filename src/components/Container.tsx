import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type ContainerProps = { children: ReactNode; size?: "sm" | "md" | "lg" | "full"; as?: "div" | "main" | "section"; className?: string };

export function Container({ children, size = "lg", as: Tag = "div", className }: ContainerProps) {
  return <Tag className={cx("vs-container", `vs-container--${size}`, className)}>{children}</Tag>;
}

export type ShowProps = { children: ReactNode; above?: "tablet" | "desktop"; below?: "tablet" | "desktop"; className?: string };

export function Show({ children, above, below, className }: ShowProps) {
  return <div className={cx("vs-show", above && `vs-show--above-${above}`, below && `vs-show--below-${below}`, className)}>{children}</div>;
}

export type SidebarLayoutProps = {
  sidebar: ReactNode; children: ReactNode; side?: "start" | "end"; width?: "sm" | "md"; sticky?: boolean;
  collapse?: "tablet" | "desktop"; sidebarFirst?: boolean; className?: string;
};

export function SidebarLayout({ sidebar, children, side = "start", width = "sm", sticky, collapse = "tablet", sidebarFirst = true, className }: SidebarLayoutProps) {
  return (
    <div className={cx("vs-sidebar-layout", `vs-sidebar-layout--${side}`, `vs-sidebar-layout--${width}`, `vs-sidebar-layout--collapse-${collapse}`, !sidebarFirst && "vs-sidebar-layout--main-first", className)}>
      <aside className={cx("vs-sidebar-layout__side", sticky && "vs-sidebar-layout__side--sticky")}>{sidebar}</aside>
      <div className="vs-sidebar-layout__main">{children}</div>
    </div>
  );
}
