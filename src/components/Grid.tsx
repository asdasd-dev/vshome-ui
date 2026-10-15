import type { CSSProperties, ReactNode } from "react";
import { cx } from "../utils/cx";
import { responsiveVars, type Responsive } from "../responsive";

export type GridProps = {
  children: ReactNode; cols?: Responsive<number>; min?: "2xs" | "xs" | "sm" | "md" | "lg"; gap?: "2" | "3" | "4" | "6" | "8";
  as?: "div" | "ul" | "section"; className?: string;
};

export function Grid({ children, cols, min, gap = "4", as: Tag = "div", className }: GridProps) {
  const style = responsiveVars("vs-grid-cols", cols) as CSSProperties;
  return (
    <div className={cx("vs-grid", className)}>
      <Tag className={cx("vs-grid__items", min ? `vs-grid__items--min-${min}` : "vs-grid__items--cols", `vs-grid__items--gap-${gap}`)} style={style}>{children}</Tag>
    </div>
  );
}
