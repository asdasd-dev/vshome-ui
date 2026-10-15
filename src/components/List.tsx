import { Children, type ReactNode } from "react";
import { cx } from "../utils/cx";

export type ListProps = { children: ReactNode; max?: number; empty?: ReactNode; className?: string };

export function List({ children, max, empty, className }: ListProps) {
  const rows = Children.toArray(children);
  if (!rows.length) return empty ? <div className={cx("vs-list-empty", className)}>{empty}</div> : null;
  const shown = max ? rows.slice(0, max) : rows;
  return (
    <div className={cx("vs-list-wrap", className)}>
      <ul className="vs-list">{shown}</ul>
      {max && rows.length > max && <div className="vs-list-more">ещё {rows.length - max}</div>}
    </div>
  );
}

export type ListRowProps = {
  title: ReactNode; sub?: ReactNode; subTone?: "muted" | "warn"; meta?: ReactNode; lead?: ReactNode;
  tone?: "default" | "warn" | "danger" | "muted"; onClick?: () => void;
};

export function ListRow({ title, sub, subTone = "muted", meta, lead, tone = "default", onClick }: ListRowProps) {
  const inner = (
    <>
      {lead && <span className="vs-list-row__lead">{lead}</span>}
      {sub != null ? (
        <span className="vs-list-row__title"><span className="vs-list-row__name">{title}</span><span className={cx("vs-list-row__sub", `vs-list-row__sub--${subTone}`)}>{sub}</span></span>
      ) : <span className="vs-list-row__title">{title}</span>}
      {meta && <span className="vs-list-row__meta">{meta}</span>}
    </>
  );
  return (
    <li className={cx("vs-list-row", `vs-list-row--${tone}`, sub != null && "vs-list-row--two")}>
      {onClick ? <button type="button" className="vs-list-row__inner" onClick={onClick}>{inner}</button> : <div className="vs-list-row__inner">{inner}</div>}
    </li>
  );
}
