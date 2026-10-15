import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type SegmentProps<T extends string> = {
  options: { value: T; label: ReactNode }[]; value: T; onChange: (v: T) => void; variant?: "default" | "soft"; className?: string;
} & ({ label: string; ariaLabel?: never } | {
  /** @deprecated переименовано в label */
  ariaLabel: string; label?: never;
});

export function Segment<T extends string>({ options, value, onChange, label, ariaLabel, variant = "default", className }: SegmentProps<T>) {
  return (
    <div className={cx("vs-segment", variant === "soft" && "vs-segment--soft", className)} role="group" aria-label={label ?? ariaLabel}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
}
