import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type KeyValueProps = {
  items: { label: ReactNode; value: ReactNode; hint?: ReactNode; tone?: "default" | "muted" | "ok" | "warn" | "danger" }[];
  cols?: 1 | 2 | 3 | 4; size?: "sm" | "md"; className?: string;
};

export function KeyValue({ items, cols = 2, size = "md", className }: KeyValueProps) {
  return (
    <dl className={cx("vs-kv", `vs-kv--cols-${cols}`, `vs-kv--${size}`, className)}>
      {items.map((it, i) => (
        <div key={i} className="vs-kv__item">
          <dt className="vs-kv__label">{it.label}</dt>
          <dd className={cx("vs-kv__value", it.tone && it.tone !== "default" && `vs-kv__value--${it.tone}`)}>{it.value}</dd>
          {it.hint && <dd className="vs-kv__hint">{it.hint}</dd>}
        </div>
      ))}
    </dl>
  );
}
