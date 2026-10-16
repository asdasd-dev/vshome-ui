import { Children, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { Text } from "./Text";

export type ListProps = { children: ReactNode; label?: ReactNode; max?: number; empty?: ReactNode; divided?: boolean; lead?: "time"; className?: string };

export function List({ children, label, max, empty, divided = true, lead, className }: ListProps) {
  const rows = Children.toArray(children);
  if (!rows.length) return empty ? <div className={cx("vs-list-empty", className)}>{empty}</div> : null;
  const shown = max ? rows.slice(0, max) : rows;
  return (
    <div className={cx("vs-list-wrap", className)}>
      {label && <Text as="p" variant="label" className="vs-list__label">{label}</Text>}
      <ul className={cx("vs-list", !divided && "vs-list--plain", lead && `vs-list--lead-${lead}`)}>{shown}</ul>
      {max && rows.length > max && <div className="vs-list-more">ещё {rows.length - max}</div>}
    </div>
  );
}

export type ListRowProps = {
  title: ReactNode; titleLines?: 1 | 2; sub?: ReactNode; subTone?: "muted" | "warn"; subLines?: 1 | 2 | 3; meta?: ReactNode; lead?: ReactNode;
  tone?: "default" | "warn" | "danger" | "muted"; onClick?: () => void; href?: string; align?: "baseline" | "center"; selected?: boolean; className?: string;
};

export function ListRow({ title, titleLines = 1, sub, subTone = "muted", subLines = 1, meta, lead, tone = "default", onClick, href, align = "baseline", selected, className }: ListRowProps) {
  const current = selected ? { "aria-current": "true" as const } : {};
  const inner = (
    <>
      {lead && <span className="vs-list-row__lead">{lead}</span>}
      {sub != null ? (
        <span className="vs-list-row__title"><span className={cx("vs-list-row__name", titleLines === 2 && "vs-list-row__name--2")}>{title}</span><span className={cx("vs-list-row__sub", `vs-list-row__sub--${subTone}`, subLines > 1 && `vs-list-row__sub--${subLines}`)}>{sub}</span></span>
      ) : <span className={cx("vs-list-row__title", titleLines === 2 && "vs-list-row__title--2")}>{title}</span>}
      {meta != null && meta !== false && <span className="vs-list-row__meta">{meta}</span>}
    </>
  );
  return (
    <li className={cx("vs-list-row", `vs-list-row--${tone}`, sub != null && "vs-list-row--two", align === "center" && "vs-list-row--center", selected && "vs-list-row--selected", className)}>
      {href != null ? <a className="vs-list-row__inner" href={href} onClick={onClick} {...current}>{inner}</a> : onClick ? <button type="button" className="vs-list-row__inner" onClick={onClick} {...current}>{inner}</button> : <div className="vs-list-row__inner" {...current}>{inner}</div>}
    </li>
  );
}
