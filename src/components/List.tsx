import { Children, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { Text } from "./Text";

export type ListProps = { children: ReactNode; label?: ReactNode; max?: number; empty?: ReactNode; className?: string };

export function List({ children, label, max, empty, className }: ListProps) {
  const rows = Children.toArray(children);
  if (!rows.length) return empty ? <div className={cx("vs-list-empty", className)}>{empty}</div> : null;
  const shown = max ? rows.slice(0, max) : rows;
  return (
    <div className={cx("vs-list-wrap", className)}>
      {label && <Text as="p" variant="label" className="vs-list__label">{label}</Text>}
      <ul className="vs-list">{shown}</ul>
      {max && rows.length > max && <div className="vs-list-more">ещё {rows.length - max}</div>}
    </div>
  );
}

export type ListRowProps = {
  title: ReactNode; titleLines?: 1 | 2; sub?: ReactNode; subTone?: "muted" | "warn"; subLines?: 1 | 2 | 3; meta?: ReactNode; lead?: ReactNode;
  tone?: "default" | "warn" | "danger" | "muted"; onClick?: () => void;
};

export function ListRow({ title, titleLines = 1, sub, subTone = "muted", subLines = 1, meta, lead, tone = "default", onClick }: ListRowProps) {
  const inner = (
    <>
      {lead && <span className="vs-list-row__lead">{lead}</span>}
      {sub != null ? (
        <span className="vs-list-row__title"><span className={cx("vs-list-row__name", titleLines === 2 && "vs-list-row__name--2")}>{title}</span><span className={cx("vs-list-row__sub", `vs-list-row__sub--${subTone}`, subLines > 1 && `vs-list-row__sub--${subLines}`)}>{sub}</span></span>
      ) : <span className={cx("vs-list-row__title", titleLines === 2 && "vs-list-row__title--2")}>{title}</span>}
      {meta && <span className="vs-list-row__meta">{meta}</span>}
    </>
  );
  return (
    <li className={cx("vs-list-row", `vs-list-row--${tone}`, sub != null && "vs-list-row--two")}>
      {onClick ? <button type="button" className="vs-list-row__inner" onClick={onClick}>{inner}</button> : <div className="vs-list-row__inner">{inner}</div>}
    </li>
  );
}
