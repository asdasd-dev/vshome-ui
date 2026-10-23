import { Children, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { Text } from "./Text";

export type ListProps = {
  children: ReactNode; label?: ReactNode; max?: number; fit?: boolean; onMore?: () => void; empty?: ReactNode; divided?: boolean; lead?: "time" | "icon"; className?: string;
};

function fitCount(wrap: HTMLElement, list: HTMLElement | null, more: HTMLElement | null): number | null {
  const avail = wrap.clientHeight;
  const rows = list ? [...list.children] : [];
  if (!avail || !rows.length) return null;
  const top = wrap.getBoundingClientRect().top;
  const bottom = (i: number) => rows[i]!.getBoundingClientRect().bottom - top;
  if (bottom(rows.length - 1) <= avail + 0.5) return rows.length;
  const reserve = more ? more.getBoundingClientRect().height + (parseFloat(getComputedStyle(wrap).rowGap) || 0) : 0;
  let n = rows.length - 1;
  while (n > 0 && bottom(n - 1) + reserve > avail + 0.5) n--;
  return n;
}

function useFit(enabled: boolean, children: ReactNode) {
  const wrap = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const more = useRef<HTMLElement | null>(null);
  const [n, setN] = useState<number | null>(null);
  useLayoutEffect(() => { if (enabled) setN(null); }, [enabled, children]);
  useLayoutEffect(() => {
    if (!enabled || n !== null || !wrap.current) return;
    const fit = fitCount(wrap.current, list.current, more.current);
    if (fit !== null) setN(fit);
  });
  useLayoutEffect(() => {
    const el = wrap.current;
    if (!enabled || !el || typeof ResizeObserver === "undefined") return;
    let size = `${el.clientWidth}x${el.clientHeight}`;
    const ro = new ResizeObserver(() => {
      const next = `${el.clientWidth}x${el.clientHeight}`;
      if (next === size) return;
      size = next;
      setN(null);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [enabled]);
  return { wrap, list, more, n: enabled ? n : null };
}

export function List({ children, label, max, fit, onMore, empty, divided = true, lead, className }: ListProps) {
  const rows = Children.toArray(children);
  const f = useFit(!!fit && rows.length > 0, children);
  if (!rows.length) return empty ? <div className={cx("vs-list-empty", className)}>{empty}</div> : null;
  const capped = max ? rows.slice(0, max) : rows;
  const shown = f.n === null ? capped : capped.slice(0, f.n);
  const measuring = !!fit && f.n === null;
  const hidden = rows.length - shown.length;
  const more = (measuring || hidden > 0) && (!fit || !!onMore);
  const text = `ещё ${measuring ? rows.length : hidden}`;
  const setMore = (el: HTMLElement | null) => { f.more.current = el; };
  return (
    <div ref={f.wrap} className={cx("vs-list-wrap", fit && "vs-list-wrap--fit", className)}>
      {label && <Text as="p" variant="label" className="vs-list__label">{label}</Text>}
      <ul ref={f.list} className={cx("vs-list", !divided && "vs-list--plain", lead && `vs-list--lead-${lead}`)}>{shown}</ul>
      {more && (onMore
        ? <button ref={setMore} type="button" className="vs-list-more vs-list-more--button" onClick={onMore}>{text}</button>
        : <div ref={setMore} className="vs-list-more">{text}</div>)}
    </div>
  );
}

export type ListRowProps = {
  title: ReactNode; titleLines?: 1 | 2; sub?: ReactNode; subTone?: "muted" | "warn"; subLines?: 1 | 2 | 3; meta?: ReactNode; lead?: ReactNode; action?: ReactNode;
  tone?: "default" | "warn" | "danger" | "muted"; onClick?: () => void; href?: string; align?: "baseline" | "center"; selected?: boolean; className?: string;
};

export function ListRow({ title, titleLines = 1, sub, subTone = "muted", subLines = 1, meta, lead, action, tone = "default", onClick, href, align = "baseline", selected, className }: ListRowProps) {
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
    <li className={cx("vs-list-row", `vs-list-row--${tone}`, sub != null && "vs-list-row--two", align === "center" && "vs-list-row--center", selected && "vs-list-row--selected", action != null && "vs-list-row--action", className)}>
      {href != null ? <a className="vs-list-row__inner" href={href} onClick={onClick} {...current}>{inner}</a> : onClick ? <button type="button" className="vs-list-row__inner" onClick={onClick} {...current}>{inner}</button> : <div className="vs-list-row__inner" {...current}>{inner}</div>}
      {action != null && <span className="vs-list-row__action">{action}</span>}
    </li>
  );
}
