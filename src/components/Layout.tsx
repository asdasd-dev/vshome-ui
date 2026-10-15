import type { ReactNode } from "react";
import { cx } from "../utils/cx";

type Gap = "1" | "2" | "3" | "4" | "6";

export type ClusterProps = {
  gap?: Gap; align?: "center" | "baseline" | "start" | "stretch"; justify?: "start" | "center" | "between" | "end";
  wrap?: boolean; rigid?: boolean; as?: "div" | "span" | "header" | "footer"; className?: string; children: ReactNode;
};

export function Cluster({ gap = "2", align = "center", justify, wrap, rigid, as: Tag = "div", className, children }: ClusterProps) {
  return (
    <Tag className={cx("vs-cluster", `vs-cluster--gap-${gap}`, `vs-cluster--align-${align}`, justify && `vs-cluster--justify-${justify}`, wrap && "vs-cluster--wrap", rigid && "vs-cluster--rigid", className)}>
      {children}
    </Tag>
  );
}

export type StackProps = { gap?: Gap; align?: "start" | "center" | "stretch"; as?: "div" | "span"; className?: string; children: ReactNode };

export function Stack({ gap = "2", align, as: Tag = "div", className, children }: StackProps) {
  return <Tag className={cx("vs-stack", `vs-stack--gap-${gap}`, align && `vs-stack--align-${align}`, className)}>{children}</Tag>;
}

export type DividerProps = { vertical?: boolean; className?: string };

export function Divider({ vertical, className }: DividerProps) {
  return <span role="separator" aria-orientation={vertical ? "vertical" : "horizontal"} className={cx("vs-divider", vertical && "vs-divider--vertical", className)} />;
}
