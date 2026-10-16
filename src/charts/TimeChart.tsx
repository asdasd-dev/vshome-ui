import { useRef, useState, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { niceMax } from "./scale";
import { CHART_H as H, PAD, pointerX, useTipLeft, useWidth, type TipPos } from "./useChartFrame";

export type TimeSeries = { name: string; color: string; points: [number, number][]; dots?: boolean; line?: boolean; area?: boolean; fmt?: (v: number) => string };
export type RefLine = { y: number; label: string; color?: string; dashed?: boolean };

export type TimeChartProps = {
  series: TimeSeries[]; refLines?: RefLine[]; yFrom?: "zero" | "data"; now?: number; unit?: string;
  xFormat?: (t: number) => string; tipFormat?: (t: number) => string; yFormat?: (v: number) => string; label?: string; className?: string;
};

const { L, R, T, B } = PAD;

const niceStep = (raw: number) => {
  const p = 10 ** Math.floor(Math.log10(raw));
  const m = raw / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p;
};

const placeRefs = (refs: RefLine[], y: (v: number) => number) => {
  const sorted = [...refs].sort((a, b) => b.y - a.y);
  let prev = -Infinity;
  return sorted.map((r) => { const py = y(r.y); const below = py - prev < 14; prev = below ? py + 16 : py; return { r, below }; });
};
const DAY = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit" });
const FULL = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short", year: "numeric" });

export function TimeChart({ series, refLines = [], yFrom = "zero", now, unit, xFormat = (t) => DAY.format(t * 1000), tipFormat = (t) => FULL.format(t * 1000), yFormat = (v) => String(Math.round(v)), label, className }: TimeChartProps) {
  const [box, width] = useWidth();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<(TipPos & { t: number }) | null>(null);
  const tipRef = useTipLeft(hover);
  const W = Math.max(280, width);
  const all = series.flatMap((s) => s.points);
  const ts = all.map((p) => p[0]).concat(now != null ? [now] : []);
  const vs = all.map((p) => p[1]).concat(refLines.map((r) => r.y));
  const t0 = Math.min(...ts), t1 = Math.max(...ts);
  const rawHi = Math.max(0, ...vs), rawLo = yFrom === "data" && vs.length ? Math.max(0, Math.min(...vs)) : 0;
  const step = niceStep((rawHi - rawLo || rawHi || 1) / 4);
  const lo = yFrom === "data" ? Math.floor(rawLo / step) * step : 0;
  const hi = yFrom === "data" ? Math.max(lo + step * 4, Math.ceil(rawHi / step) * step) : niceMax(rawHi * 1.05);
  const x = (t: number) => L + ((W - L - R) * (t - t0)) / Math.max(1, t1 - t0);
  const y = (v: number) => T + (H - T - B) * (1 - (v - lo) / Math.max(1e-9, hi - lo));
  const ticks = [0, 1, 2, 3].map((k) => t0 + ((t1 - t0) * k) / 3);
  const nearest = (t: number) => all.reduce((best, p) => (Math.abs(p[0] - t) < Math.abs(best - t) ? p[0] : best), all[0]?.[0] ?? t);
  function move(ev: React.MouseEvent | React.TouchEvent) {
    const svg = svgRef.current;
    if (!svg || !all.length) return;
    const { px, boxW } = pointerX(ev, svg);
    const t = t0 + (((px * W) / boxW - L) / (W - L - R)) * (t1 - t0);
    setHover({ t: nearest(t), px, boxW, gap: 12 });
  }
  let tip: ReactNode = null;
  if (hover) {
    tip = <><b>{tipFormat(hover.t)}</b>{series.map((s) => { const p = s.points.reduce<[number, number] | undefined>((best, q) => (!best || Math.abs(q[0] - hover.t) < Math.abs(best[0] - hover.t) ? q : best), undefined); return p ? <span key={s.name}><br /><i style={{ background: s.color }} />{s.name}: {s.fmt ? s.fmt(p[1]) : p[1]}</span> : null; })}</>;
  }
  const refX = (now != null ? Math.min(x(now), W - R) : W - R) - 8;
  const path = (pts: [number, number][]) => pts.map((p, i) => `${i ? "L" : "M"}${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join("");
  return (
    <div className={cx("vs-chart", className)}>
      <div className="vs-chart-tip" ref={tipRef} hidden={!hover}>{tip}</div>
      <div className="vs-chart-view" ref={box}>
        {width > 0 && (
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={label}>
            {[0, 1, 2, 3, 4].map((g) => {
              const v = lo + ((hi - lo) * g) / 4;
              return <g key={g}><line className="vs-chart-grid" x1={L} x2={W - R} y1={y(v)} y2={y(v)} /><text className="vs-chart-axis" x={L - 6} y={y(v) + 4} textAnchor="end">{yFormat(v) + (g === 4 ? unit ?? "" : "")}</text></g>;
            })}
            {ticks.map((t, k) => <text key={k} className="vs-chart-axis" x={x(t)} y={H - 6} textAnchor={k === 0 ? "start" : k === 3 ? "end" : "middle"}>{xFormat(t)}</text>)}
            {placeRefs(refLines, y).map(({ r, below }, k) => (
              <g key={`r${k}`}>
                <line x1={L} x2={W - R} y1={y(r.y)} y2={y(r.y)} stroke={r.color ?? "var(--vs-muted)"} strokeWidth={1} strokeDasharray={r.dashed === false ? undefined : "4 3"} />
                <text className="vs-chart-axis vs-chart-ref" x={refX} y={y(r.y) + (below ? 12 : -4)} textAnchor="end">{r.label}</text>
              </g>
            ))}
            {now != null && <line className="vs-chart-restart" x1={x(now)} x2={x(now)} y1={T} y2={H - B} />}
            {series.map((s) => {
              const pts = [...s.points].sort((a, b) => a[0] - b[0]);
              return (
                <g key={s.name}>
                  {s.area && pts.length > 1 && <path d={`${path(pts)}L${x(pts[pts.length - 1]![0]).toFixed(1)},${y(lo)}L${x(pts[0]![0]).toFixed(1)},${y(lo)}Z`} fill={s.color} opacity={0.12} />}
                  {(s.line ?? !s.dots) && <path d={path(pts)} fill="none" stroke={s.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />}
                  {(s.dots || pts.length === 1) && pts.map((p, i) => <circle key={i} cx={x(p[0])} cy={y(p[1])} r={3} fill={s.color} />)}
                </g>
              );
            })}
            {hover && <line className="vs-chart-cross" x1={x(hover.t)} x2={x(hover.t)} y1={T} y2={H - B} />}
            <rect x={L} y={0} width={W - L - R} height={H} fill="transparent" onMouseMove={move} onTouchStart={move} onTouchMove={move} onMouseLeave={() => setHover(null)} />
          </svg>
        )}
      </div>
    </div>
  );
}
