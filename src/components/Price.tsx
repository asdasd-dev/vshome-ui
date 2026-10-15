import { cx } from "../utils/cx";

export type PriceProps = {
  value: number; old?: number; unit?: string; note?: string; size?: "sm" | "md" | "lg"; tone?: "default" | "deal" | "muted";
  gone?: boolean; currency?: string; className?: string;
};

const rub = (k: number) => Math.floor(k / 100).toLocaleString("ru-RU");
const kop = (k: number) => String(k % 100).padStart(2, "0");

export function Price({ value, old, unit, note, size = "md", tone = "default", gone, currency = "₽", className }: PriceProps) {
  const text = `${rub(value)},${kop(value)} ${currency}${unit ? `/${unit}` : ""}`;
  return (
    <span className={cx("vs-price", `vs-price--${size}`, `vs-price--${tone}`, gone && "vs-price--gone", className)} role="img" aria-label={[text, note, old != null ? `было ${rub(old)},${kop(old)} ${currency}` : "", gone ? "нет в наличии" : ""].filter(Boolean).join(", ")}>
      <span className="vs-price__tag" aria-hidden="true">
        <span className="vs-price__rub">{rub(value)}</span><span className="vs-price__kop">{kop(value)}</span>
        <span className="vs-price__cur">{currency}{unit ? `/${unit}` : ""}{note && <span className="vs-price__note">{note}</span>}</span>
      </span>
      {old != null && <s className="vs-price__old" aria-hidden="true">{rub(old)},{kop(old)} {currency}</s>}
    </span>
  );
}
