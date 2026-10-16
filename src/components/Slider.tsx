import type { CSSProperties } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";
import type { IconName } from "./icons";
import { useRangeCommit } from "./useRangeCommit";

export type SliderProps = { value: number; min?: number; max?: number; step?: number; label: string; onCommit: (v: number) => void; format?: (v: number) => string; icon?: IconName; variant?: "bar" | "line"; orientation?: "horizontal" | "vertical"; disabled?: boolean; className?: string };

export function Slider({ value, min = 1, max = 100, step = 1, label, onCommit, format = String, icon, variant = "bar", orientation = "horizontal", disabled, className }: SliderProps) {
  const { v, input } = useRangeCommit(value, onCommit);
  const fill = `${((v - min) / (max - min)) * 100}%`;
  const vertical = variant === "line" && orientation === "vertical";
  const range = <input type="range" aria-label={label} aria-valuetext={format(v)} aria-orientation={vertical ? "vertical" : undefined} min={min} max={max} step={step} disabled={disabled} {...input} />;
  if (variant === "line") {
    const track = <label className={cx("vs-range-line", vertical && "vs-range-line--vertical")} style={{ "--vs-range-fill": fill } as CSSProperties}>{range}</label>;
    const mark = icon && <Icon name={icon} size="sm" />;
    return <div className={cx("vs-slider-line", vertical && "vs-slider-line--vertical", className)}>{vertical ? <>{track}{mark}</> : <>{mark}{track}</>}</div>;
  }
  return (
    <label className={cx("vs-slider", className)} style={{ "--vs-slider-fill": fill } as CSSProperties}>
      {range}
      {icon && <Icon name={icon} size="sm" className="vs-slider__icon" />}
      <span className="vs-slider__value">{format(v)}</span>
    </label>
  );
}
