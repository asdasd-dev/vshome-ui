import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import type { Tone } from "./tone";

export type TextProps = {
  variant?: "display" | "headline" | "title" | "lead" | "body" | "caption" | "label";
  tone?: "default" | Tone;
  weight?: "medium" | "semibold";
  as?: "span" | "p" | "div" | "h1" | "h2" | "h3" | "h4";
  lines?: 1 | 2 | 3;
  className?: string;
  id?: string;
  title?: string;
  children: ReactNode;
};

export function Text({ variant = "body", tone = "default", weight, as: Tag = "span", lines, className, id, title, children }: TextProps) {
  return (
    <Tag
      className={cx("vs-text", `vs-text--${variant}`, tone !== "default" && `vs-text--${tone}`, weight && `vs-text--w-${weight}`, lines && `vs-text--lines-${lines}`, className)}
      id={id}
      title={title}
    >
      {children}
    </Tag>
  );
}
