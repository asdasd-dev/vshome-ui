import { useRef, useState } from "react";
import { niceMax } from "./scale";
import { CHART_H as H, PAD, useTipLeft, useWidth, type TipPos } from "./useChartFrame";

export type StackedBarsProps = {
  /** дни YYYY-MM-DD */
  labels: string[];
  series: { name: string; color: string; data: number[] }[];
  fmt: (v: number) => string;
};

const { L, R, T, B } = PAD;
const dm = (d: string) => `${d.slice(8, 10)}.${d.slice(5, 7)}`;

export function StackedBars({ labels, series, fmt }: StackedBarsProps) {
  const [box, width] = useWidth();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<(TipPos & { i: number }) | null>(null);
  const tipRef = useTipLeft(hover);

  const W = Math.max(280, width), n = labels.length;
  const tot = labels.map((_, i) => series.reduce((a, s) => a + (s.data[i] || 0), 0));
  const max = niceMax(Math.max(0, ...tot) * 1.05);
  const y = (v: number) => T + (H - T - B) * (1 - v / max);
  const bw = (W - L - R) / Math.max(1, n), w = Math.max(4, bw - 6);

  function show(i: number) {
    const svg = svgRef.current;
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    setHover({ i, px: ((L + bw * (i + 1)) * r.width) / W, boxW: r.width, gap: 6 });
  }

  return (
    <div className="vs-chart">
      <div className="vs-chart-tip" ref={tipRef} hidden={!hover}>
        {hover && (
          <>
            <b>{dm(labels[hover.i] ?? "")}</b> — {fmt(tot[hover.i] ?? 0)}
            {series.map((s) => <span key={s.name}><br /><i style={{ background: s.color }} />{s.name}: {fmt(s.data[hover.i] || 0)}</span>)}
          </>
        )}
      </div>
      <div className="vs-chart-view" ref={box}>
        {width > 0 && (
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img">
            {[0, 1, 2, 3, 4].map((g) => {
              const v = (max * g) / 4;
              return (
                <g key={g}>
                  <line className="vs-chart-grid" x1={L} x2={W - R} y1={y(v)} y2={y(v)} />
                  <text className="vs-chart-axis" x={L - 6} y={y(v) + 4} textAnchor="end">{fmt(v)}</text>
                </g>
              );
            })}
            {labels.map((lb, i) => {
              const cx = L + bw * i + (bw - w) / 2, total = tot[i] ?? 0;
              let acc = 0;
              return (
                <g key={lb}>
                  {series.map((s, k) => {
                    const v = s.data[i] || 0;
                    if (!v) return null;
                    const y0 = y(acc), y1 = y(acc + v);
                    acc += v;
                    const isTop = !series.slice(k + 1).some((q) => q.data[i]);
                    const gap = acc < total ? 2 : 0;
                    const hgt = Math.max(1, y0 - y1 - gap);
                    if (isTop && hgt > 4) {
                      return <path key={s.name} fill={s.color} d={`M${cx} ${y0}V${y1 + 4}Q${cx} ${y1} ${cx + 4} ${y1}H${cx + w - 4}Q${cx + w} ${y1} ${cx + w} ${y1 + 4}V${y0}Z`} />;
                    }
                    return <rect key={s.name} fill={s.color} x={cx} y={y1 + gap} width={w} height={hgt} />;
                  })}
                  {i % 2 === (n - 1) % 2 && <text className="vs-chart-axis" x={cx + w / 2} y={H - 6} textAnchor="middle">{dm(lb)}</text>}
                  <rect x={L + bw * i} y={0} width={bw} height={H} fill="transparent" onMouseMove={() => show(i)} onTouchStart={() => show(i)} onMouseLeave={() => setHover(null)} />
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
