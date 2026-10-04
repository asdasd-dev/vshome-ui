export function plural(n: number, one: string, few: string, many: string): string {
  const a = Math.abs(Math.round(n)) % 100, d = a % 10;
  return d === 1 && a !== 11 ? one : d >= 2 && d <= 4 && (a < 12 || a > 14) ? few : many;
}

export function compact(n: number): string {
  return n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}k` : String(n || 0);
}
