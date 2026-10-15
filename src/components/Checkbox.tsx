import { useId, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";

export type CheckboxProps = { checked: boolean; onChange: (checked: boolean) => void; label: ReactNode; hint?: ReactNode; size?: "md" | "lg"; disabled?: boolean; className?: string };

export function Checkbox({ checked, onChange, label, hint, size = "md", disabled, className }: CheckboxProps) {
  return (
    <label className={cx("vs-checkbox", `vs-checkbox--${size}`, className)}>
      <span className="vs-checkbox__box">
        <input type="checkbox" className="vs-checkbox__input" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
        <Icon name="check" size="em" className="vs-checkbox__mark" />
      </span>
      <span className="vs-checkbox__text">{label}{hint && <span className="vs-checkbox__hint">{hint}</span>}</span>
    </label>
  );
}

export type RadioGroupProps<T extends string> = {
  legend: string; options: { value: T; label: ReactNode; hint?: ReactNode; disabled?: boolean }[]; value: T; onChange: (v: T) => void;
  direction?: "column" | "row"; hideLegend?: boolean; className?: string;
};

export function RadioGroup<T extends string>({ legend, options, value, onChange, direction = "column", hideLegend, className }: RadioGroupProps<T>) {
  const name = useId();
  return (
    <fieldset className={cx("vs-radio-group", `vs-radio-group--${direction}`, className)}>
      <legend className={cx("vs-radio-group__legend", hideLegend && "vs-visually-hidden")}>{legend}</legend>
      {options.map((o) => (
        <label key={o.value} className="vs-radio">
          <input type="radio" className="vs-radio__input" name={name} value={o.value} checked={o.value === value} disabled={o.disabled} onChange={() => onChange(o.value)} />
          <span className="vs-checkbox__text">{o.label}{o.hint && <span className="vs-checkbox__hint">{o.hint}</span>}</span>
        </label>
      ))}
    </fieldset>
  );
}
