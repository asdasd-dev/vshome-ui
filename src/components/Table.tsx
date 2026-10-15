import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type TableColumn<R> = { key: string; label: ReactNode; numeric?: boolean; nowrap?: boolean; muted?: boolean; width?: string; render?: (row: R) => ReactNode };

export type TableProps<R> = {
  columns: TableColumn<R>[]; rows: R[]; rowKey: (row: R, index: number) => string | number; caption?: string; dense?: boolean;
  onRowClick?: (row: R) => void; empty?: ReactNode; className?: string;
};

export function Table<R>({ columns, rows, rowKey, caption, dense, onRowClick, empty, className }: TableProps<R>) {
  if (!rows.length && empty != null) return <div className="vs-table-empty">{empty}</div>;
  const cell = (c: TableColumn<R>) => cx("vs-table__cell", c.numeric && "vs-table__cell--numeric", c.nowrap && "vs-table__cell--nowrap", c.muted && "vs-table__cell--muted");
  return (
    <div className={cx("vs-table-wrap", className)}>
      <table className={cx("vs-table", dense && "vs-table--dense")}>
        {caption && <caption className="vs-visually-hidden">{caption}</caption>}
        <thead><tr>{columns.map((c) => <th key={c.key} scope="col" className={cell(c)} style={c.width ? { width: c.width } : undefined}>{c.label}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={rowKey(r, i)} className={onRowClick ? "vs-table__row--clickable" : undefined} tabIndex={onRowClick ? 0 : undefined}
                onClick={onRowClick ? () => onRowClick(r) : undefined} onKeyDown={onRowClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRowClick(r); } } : undefined}>
              {columns.map((c) => <td key={c.key} className={cell(c)}>{c.render ? c.render(r) : String((r as Record<string, unknown>)[c.key] ?? "")}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
