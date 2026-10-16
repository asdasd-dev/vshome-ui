import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type PageHeaderProps = {
  title: ReactNode; sub?: ReactNode; lead?: ReactNode; actions?: ReactNode; children?: ReactNode;
  sticky?: boolean; tone?: "default" | "accent" | "plain"; contained?: "sm" | "md" | "lg"; className?: string;
};

export function PageHeader({ title, sub, lead, actions, children, sticky, tone = "default", contained, className }: PageHeaderProps) {
  const body = (
    <>
      <div className="vs-page-header__row">
        {lead && <div className="vs-page-header__lead">{lead}</div>}
        <div className="vs-page-header__titles">
          <h1 className="vs-page-header__title">{title}</h1>
          {sub && <p className="vs-page-header__sub">{sub}</p>}
        </div>
        {actions && <div className="vs-page-header__actions">{actions}</div>}
      </div>
      {children && <div className="vs-page-header__extra">{children}</div>}
    </>
  );
  return (
    <header className={cx("vs-page-header", `vs-page-header--${tone === "plain" ? "default" : tone}`, sticky && "vs-page-header--sticky", contained && "vs-page-header--contained", className)}>
      {contained ? <div className={cx("vs-container", `vs-container--${contained}`, "vs-page-header__inner")}>{body}</div> : body}
    </header>
  );
}
