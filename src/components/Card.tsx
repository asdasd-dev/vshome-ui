import type { CSSProperties, ReactNode } from "react";
import { cx } from "../utils/cx";

const TONES = ["accent", "ok", "warn", "danger", "muted", "violet", "pink", "gold"];

export type CardProps = {
  children: ReactNode; as?: "div" | "section" | "article" | "li"; tone?: "default" | "accent" | "ok" | "warn" | "danger" | "muted" | "violet" | "pink" | "gold";
  stripe?: string; padding?: "none" | "sm" | "md" | "lg"; elevated?: boolean; onClick?: () => void; href?: string; external?: boolean;
  expanded?: boolean; controls?: string; label?: string; title?: string; className?: string;
};

export function Card({ children, as: Tag = "div", tone = "default", stripe, padding = "md", elevated, onClick, href, external, expanded, controls, label, title, className }: CardProps) {
  const cls = cx("vs-card", `vs-card--${tone}`, `vs-card--pad-${padding}`, elevated && "vs-card--elevated", stripe && "vs-card--stripe", (onClick || href != null) && "vs-card--interactive", className);
  const style = stripe ? ({ "--vs-card-stripe": TONES.includes(stripe) ? `var(--vs-${stripe})` : stripe } as CSSProperties) : undefined;
  if (href != null) return <a className={cls} style={style} href={href} title={title} aria-label={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
  if (onClick) return <button type="button" className={cls} style={style} onClick={onClick} title={title} aria-label={label} aria-expanded={expanded} aria-controls={controls}>{children}</button>;
  return <Tag className={cls} style={style} title={title}>{children}</Tag>;
}
