import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type LegendItem = { name: string; color: string; extra?: string };

export function Legend({ items }: { items: LegendItem[] }) {
  return (
    <div className="vs-chart-legend">
      {items.map((s) => (
        <span key={s.name}><i style={{ background: s.color }} />{s.name}{s.extra ? <> <em>{s.extra}</em></> : null}</span>
      ))}
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
};

export function ChartCard({ title, sub, legend, extra, className, children }: ChartCardProps) {
  return (
    <div className={cx("vs-chart-card", className)}>
      <div className="vs-chart-title">{title}</div>
      {sub != null && <div className="vs-chart-sub">{sub}</div>}
      {extra}
      {legend && <Legend items={legend} />}
      {children}
    </div>
  );
}
