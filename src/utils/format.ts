const pad = (n: number) => String(n).padStart(2, "0");

export function fmtDate(ms: number | null | undefined): string {
  if (ms == null) return "";
  const d = new Date(ms);
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function fmtDay(ms: number | null | undefined): string {
  if (ms == null) return "";
  const d = new Date(ms);
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}`;
}

export function localToday(d: Date = new Date()): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
