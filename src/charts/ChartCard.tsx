import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type LegendItem = { name: string; color: string; extra?: string };

export type ChartLegendProps = { items: LegendItem[]; hidden?: string[]; onToggle?: (name: string) => void };

export function ChartLegend({ items, hidden = [], onToggle }: ChartLegendProps) {
  return (
    <div className="vs-chart-legend">
      {items.map((s) => {
        const body = <><i style={{ background: s.color }} />{s.name}{s.extra ? <> <em>{s.extra}</em></> : null}</>;
        return onToggle
          ? <button key={s.name} type="button" className="vs-chart-legend-item" aria-pressed={!hidden.includes(s.name)} onClick={() => onToggle(s.name)}>{body}</button>
          : <span key={s.name}>{body}</span>;
      })}
    </div>
  );
}

export type ChartCardProps = {
  title: ReactNode;
  sub?: ReactNode;
  legend?: LegendItem[];
  /** между подзаголовком и легендой: таблица, переключатель периода */
  extra?: ReactNode;
  className?: string;
  children?: ReactNode;
  hidden?: string[];
  onToggle?: (name: string) => void;
};

export function ChartCard({ title, sub, legend, extra, className, children, hidden, onToggle }: ChartCardProps) {
  return (
    <div className={cx("vs-chart-card", className)}>
      <div className="vs-chart-title">{title}</div>
      {sub != null && <div className="vs-chart-sub">{sub}</div>}
      {extra}
      {legend && <ChartLegend items={legend} hidden={hidden} onToggle={onToggle} />}
      {children}
    </div>
  );
}
