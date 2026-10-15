import type { MouseEvent, ReactNode } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";

export type LinkProps = {
  children: ReactNode; href?: string; onClick?: (e: MouseEvent<HTMLElement>) => void; tone?: "accent" | "muted" | "danger"; external?: boolean;
  underline?: "hover" | "always"; disabled?: boolean; title?: string; className?: string;
};

export function Link({ children, href, onClick, tone = "accent", external, underline = "hover", disabled, title, className }: LinkProps) {
  const cls = cx("vs-link", `vs-link--${tone}`, `vs-link--underline-${underline}`, className);
  if (href == null || disabled) return <button type="button" className={cls} onClick={onClick} title={title} disabled={disabled}>{children}</button>;
  return (
    <a className={cls} href={href} onClick={onClick} title={title} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}{external && <Icon name="external" size="em" className="vs-link__external" />}
    </a>
  );
}
