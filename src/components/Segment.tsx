import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type SegmentProps<T extends string> = {
  options: { value: T; label: ReactNode; disabled?: boolean }[]; value: T; onChange: (v: T) => void; variant?: "default" | "soft"; size?: "sm" | "md"; className?: string;
} & ({ label: string; ariaLabel?: never } | {
  /** @deprecated переименовано в label */
  ariaLabel: string; label?: never;
});

export function Segment<T extends string>({ options, value, onChange, label, ariaLabel, variant = "default", size = "md", className }: SegmentProps<T>) {
  return (
    <div className={cx("vs-segment", variant === "soft" && "vs-segment--soft", size === "sm" && "vs-segment--sm", className)} role="group" aria-label={label ?? ariaLabel}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} disabled={o.disabled} onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
}
