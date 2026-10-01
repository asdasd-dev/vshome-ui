import type { ReactNode } from "react";

export type SegmentProps<T extends string> = { options: { value: T; label: ReactNode }[]; value: T; onChange: (v: T) => void; ariaLabel: string };

export function Segment<T extends string>({ options, value, onChange, ariaLabel }: SegmentProps<T>) {
  return (
    <div className="vs-segment" role="group" aria-label={ariaLabel}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
}
