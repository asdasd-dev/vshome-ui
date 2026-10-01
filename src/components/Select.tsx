import { CSPProvider } from "@base-ui/react/csp-provider";
import { Select as Base } from "@base-ui/react/select";
import { cx } from "../utils/cx";

export type SelectOption<T extends string> = { value: T; label: string };
export type SelectProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  label: string;
  className?: string;
  disabled?: boolean;
};

export function Select<T extends string>({ value, onChange, options, label, className, disabled }: SelectProps<T>) {
  return (
    <CSPProvider disableStyleElements>
      <Base.Root value={value} onValueChange={(v) => { if (v !== null) onChange(v as T); }} items={options} disabled={disabled}>
        <div className={cx("vs-select", className)}>
          <Base.Label className="vs-select__label">{label}</Base.Label>
          <Base.Trigger className="vs-select__trigger">
            <Base.Value className="vs-select__value" />
            <Base.Icon className="vs-select__icon">▾</Base.Icon>
          </Base.Trigger>
        </div>
        <Base.Portal>
          <Base.Positioner className="vs-select__positioner" sideOffset={4}>
            <Base.Popup className="vs-select__popup">
              <Base.List className="vs-select__list">
                {options.map((o) => (
                  <Base.Item key={o.value} value={o.value} className="vs-select__item">
                    <Base.ItemIndicator className="vs-select__check">✓</Base.ItemIndicator>
                    <Base.ItemText>{o.label}</Base.ItemText>
                  </Base.Item>
                ))}
              </Base.List>
            </Base.Popup>
          </Base.Positioner>
        </Base.Portal>
      </Base.Root>
    </CSPProvider>
  );
}
