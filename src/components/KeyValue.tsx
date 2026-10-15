import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import { cx } from "../utils/cx";
import { responsiveVars, type Responsive } from "../responsive";

export type KeyValueProps = {
  items: { label: ReactNode; value: ReactNode; hint?: ReactNode; tone?: "default" | "muted" | "ok" | "warn" | "danger" }[];
  cols?: Responsive<1 | 2 | 3 | 4> | "auto"; size?: "sm" | "md"; className?: string;
};

export function KeyValue({ items, cols = 2, size = "md", className }: KeyValueProps) {
  return (
    <div className={cx("vs-kv-wrap", className)}>
    <dl className={cx("vs-kv", cols === "auto" && "vs-kv--auto", `vs-kv--${size}`)} style={(cols === "auto" ? {} : responsiveVars("vs-grid-cols", cols)) as CSSProperties}>
      {items.map((it, i) => (
        <div key={i} className="vs-kv__item">
          <dt className="vs-kv__label">{it.label}</dt>
          <dd className={cx("vs-kv__value", it.tone && it.tone !== "default" && `vs-kv__value--${it.tone}`)}>{it.value}</dd>
          {it.hint && <dd className="vs-kv__hint">{it.hint}</dd>}
        </div>
      ))}
    </dl>
    </div>
  );
}
