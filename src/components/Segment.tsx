import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type SegmentProps<T extends string> = { options: { value: T; label: ReactNode }[]; value: T; onChange: (v: T) => void; ariaLabel: string; variant?: "default" | "soft" };

export function Segment<T extends string>({ options, value, onChange, ariaLabel, variant = "default" }: SegmentProps<T>) {
  return (
    <div className={cx("vs-segment", variant === "soft" && "vs-segment--soft")} role="group" aria-label={ariaLabel}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
}
