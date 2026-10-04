import { useRef, useState, type ReactNode } from "react";
import { dayTicks, fmtStamp, linePath, niceMax } from "./scale";
import { CHART_H as H, PAD, pointerX, useTipLeft, useWidth, type TipPos } from "./useChartFrame";

export type Series = { name: string; color: string; data: (number | null)[]; fmt?: (v: number) => string };
export type ChartMark = { i: number; dashed?: boolean; label: string };

export type LineChartProps = {
  /** начало ряда и шаг точки, секунды */
  t0: number;
  step: number;
  series: Series[];
  unit?: string;
  yMax?: number;
  bands?: [number, number][];
  bandLabel?: string;
  marks?: ChartMark[];
  connect?: boolean;
  xEvery?: number;
  note?: (i: number) => string;
};

const { L, R, T, B } = PAD;

export function LineChart(p: LineChartProps) {
  const [box, width] = useWidth();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<(TipPos & { i: number }) | null>(null);
  const tipRef = useTipLeft(hover);

  const W = Math.max(280, width);
  const n = Math.max(0, ...p.series.map((s) => s.data.length));
  const top = Math.max(0, ...p.series.flatMap((s) => s.data.filter((v): v is number => v != null)));
  const max = p.yMax || niceMax(top * 1.05);
  const x = (i: number) => L + ((W - L - R) * i) / Math.max(1, n - 1);
  const y = (v: number) => T + (H - T - B) * (1 - Math.min(v, max) / max);
  const days = dayTicks(p.t0, p.step, n, p.xEvery);
  const hasValue = (j: number) => p.series.some((s) => s.data[j] != null);

  function move(ev: React.MouseEvent | React.TouchEvent) {
    const svg = svgRef.current;
    if (!svg) return;
    const { px, boxW } = pointerX(ev, svg);
    let i = Math.round(((px * W) / boxW - L) / (W - L - R) * (n - 1));
    if (!(i >= 0 && i < n)) return setHover(null);
    if (p.connect) {
      let best = -1;
      for (let j = 0; j < n; j++) if (hasValue(j) && (best < 0 || Math.abs(j - i) < Math.abs(best - i))) best = j;
      if (best < 0) return setHover(null);
      i = best;
    }
    setHover({ i, px, boxW, gap: 12 });
  }

  let tip: ReactNode = null;
  if (hover) {
    const i = hover.i;
    tip = (
      <>
        <b>{fmtStamp(p.t0 + i * p.step)}</b>
        {p.series.map((s) => {
          const v = s.data[i];
          return <span key={s.name}><br /><i style={{ background: s.color }} />{s.name}: {v == null ? "—" : s.fmt ? s.fmt(v) : v}</span>;
        })}
        {p.bands?.some(([a, b]) => i >= a && i <= b) && <><br /><span className="vs-chart-tip-band">{p.bandLabel ?? "нет данных"}</span></>}
        {p.note?.(i) ? <><br />{p.note(i)}</> : null}
        {(p.marks ?? []).filter((m) => Math.abs(m.i - i) <= 1).map((m, k) => (
          <span key={k}><br /><span className={m.dashed ? "vs-chart-tip-restart" : "vs-chart-tip-mark"}>{m.dashed ? "↻ " : "🚀 "}{m.label}</span></span>
        ))}
      </>
    );
  }

  return (
    <div className="vs-chart">
      <div className="vs-chart-tip" ref={tipRef} hidden={!hover}>{tip}</div>
      <div className="vs-chart-view" ref={box}>
        {width > 0 && (
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img">
            {(p.bands ?? []).map(([a, b], k) => (
              <rect key={k} className="vs-chart-band" x={x(a)} y={T} width={Math.max(2, x(b) - x(a))} height={H - T - B} />
            ))}
            {[0, 1, 2, 3, 4].map((g) => {
              const v = (max * g) / 4;
              return (
                <g key={g}>
                  <line className="vs-chart-grid" x1={L} x2={W - R} y1={y(v)} y2={y(v)} />
                  <text className="vs-chart-axis" x={L - 6} y={y(v) + 4} textAnchor="end">{Math.round(v) + (g === 4 ? p.unit ?? "" : "")}</text>
                </g>
              );
            })}
            {days.map((i) => (
              <text key={i} className="vs-chart-axis" x={x(i)} y={H - 6} textAnchor="middle">{fmtStamp(p.t0 + i * p.step).slice(0, 5)}</text>
            ))}
            {(p.marks ?? []).filter((m) => m.i >= 0 && m.i < n).map((m, k) => (
              <line key={k} className={m.dashed ? "vs-chart-restart" : "vs-chart-mark"} x1={x(m.i)} x2={x(m.i)} y1={T} y2={H - B} />
            ))}
            {p.series.map((s) => (
              <g key={s.name}>
                {p.connect && s.data.map((v, i) => v != null && <circle key={i} className="vs-chart-dot" cx={x(i)} cy={y(v)} r={3} fill={s.color} strokeWidth={1.5} />)}
                <path d={linePath(s.data, x, y, !!p.connect)} fill="none" stroke={s.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                {s.data.map((v, i) => v != null && (i === 0 || s.data[i - 1] == null) && (i === n - 1 || s.data[i + 1] == null) && (
                  <circle key={`s${i}`} cx={x(i)} cy={y(v)} r={2.5} fill={s.color} />
                ))}
              </g>
            ))}
            {hover && <line className="vs-chart-cross" x1={x(hover.i)} x2={x(hover.i)} y1={T} y2={H - B} />}
            {hover && p.series.map((s) => {
              const v = s.data[hover.i];
              return v != null && <circle key={s.name} className="vs-chart-dot" r={4} cx={x(hover.i)} cy={y(v)} fill={s.color} strokeWidth={2} />;
            })}
            <rect x={L} y={0} width={W - L - R} height={H} fill="transparent" onMouseMove={move} onTouchStart={move} onTouchMove={move} onMouseLeave={() => setHover(null)} />
          </svg>
        )}
      </div>
    </div>
  );
}
