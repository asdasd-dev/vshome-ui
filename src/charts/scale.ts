const STEPS = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
const pad = (n: number) => String(n).padStart(2, "0");

export function niceMax(max: number): number {
  if (!(max > 0)) return 4;
  const s = max / 4, p = 10 ** Math.floor(Math.log10(s)), m = s / p;
  for (const r of STEPS) if (m <= r + 1e-9) return r * p * 4;
  return 40 * p;
}

/** t0 и step — в секундах */
export function dayTicks(t0: number, step: number, n: number, every?: number): number[] {
  const days: number[] = [];
  for (let i = 0; i < n; i++) {
    const d = new Date((t0 + i * step) * 1000);
    if (d.getHours() === 0 && d.getMinutes() === 0) days.push(i);
  }
  return every ? days.filter((_, j) => j % every === 0) : days;
}

export function outageBands(alive: (number | null)[]): [number, number][] {
  const bands: [number, number][] = [];
  let start: number | null = null;
  alive.forEach((v, i) => {
    if (v != null && v < 1) { if (start == null) start = i; }
    else if (start != null) { bands.push([start, i - 1]); start = null; }
  });
  if (start != null) bands.push([start, alive.length - 1]);
  return bands;
}

export function linePath(data: (number | null)[], x: (i: number) => number, y: (v: number) => number, connect: boolean): string {
  let d = "", pen = false;
  data.forEach((v, i) => {
    if (v == null) { if (!connect) pen = false; return; }
    d += `${pen ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`;
    pen = true;
  });
  return d;
}

/** t — в секундах */
export function fmtStamp(t: number): string {
  const d = new Date(t * 1000);
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
