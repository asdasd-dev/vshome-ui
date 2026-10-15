import type { CSSProperties, ReactNode } from "react";
import { cx } from "../utils/cx";

export type SegmentProps<T extends string> = {
  options: { value: T; label: ReactNode; disabled?: boolean }[]; value: T; onChange: (v: T) => void; variant?: "default" | "soft"; size?: "sm" | "md"; progress?: number; className?: string;
} & ({ label: string; ariaLabel?: never } | {
  /** @deprecated переименовано в label */
  ariaLabel: string; label?: never;
});

export function Segment<T extends string>({ options, value, onChange, label, ariaLabel, variant = "default", size = "md", progress, className }: SegmentProps<T>) {
  const style = progress == null ? undefined : ({ "--vs-segment-pos": String(progress), "--vs-segment-n": String(options.length) } as CSSProperties);
  return (
    <div className={cx("vs-segment", variant === "soft" && "vs-segment--soft", size === "sm" && "vs-segment--sm", progress != null && "vs-segment--thumb", className)} role="group" aria-label={label ?? ariaLabel} style={style}>
      {progress != null && <span className="vs-segment__thumb" aria-hidden="true" />}
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} disabled={o.disabled} onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
}
