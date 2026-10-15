import { useEffect, useId, useState, type ReactNode } from "react";
import { CSPProvider } from "@base-ui/react/csp-provider";
import { Select as Base } from "@base-ui/react/select";
import { cx } from "../utils/cx";
import { Icon } from "./Icon";
import { trackOpenPopup } from "../utils/openPopups";

export type SelectOption<T extends string> = { value: T; label: string };
export type SelectProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  label: string;
  hint?: ReactNode;
  error?: ReactNode;
  hideLabel?: boolean;
  className?: string;
  disabled?: boolean;
};

export function Select<T extends string>({ value, onChange, options, label, hint, error, hideLabel, className, disabled }: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const described = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  useEffect(() => (open ? trackOpenPopup() : undefined), [open]);
  return (
    <CSPProvider disableStyleElements>
      <Base.Root open={open} onOpenChange={setOpen} value={value} onValueChange={(v) => { if (v !== null) onChange(v as T); }} items={options} disabled={disabled}>
        <div className={cx("vs-select", className)}>
          <Base.Label className={cx("vs-select__label", hideLabel && "vs-visually-hidden")}>{label}</Base.Label>
          <Base.Trigger className="vs-select__trigger" aria-describedby={described} aria-invalid={error ? true : undefined}>
            <Base.Value className="vs-select__value" />
            <Base.Icon className="vs-select__icon"><Icon name="chevron-down" size="sm" /></Base.Icon>
          </Base.Trigger>
          {hint && <p id={`${id}-hint`} className="vs-field__hint">{hint}</p>}
          {error && <p id={`${id}-error`} className="vs-field__error">{error}</p>}
        </div>
        <Base.Portal>
          <Base.Positioner className="vs-select__positioner" sideOffset={4}>
            <Base.Popup className="vs-select__popup">
              <Base.List className="vs-select__list">
                {options.map((o) => (
                  <Base.Item key={o.value} value={o.value} className="vs-select__item">
                    <Base.ItemIndicator className="vs-select__check"><Icon name="check" size="sm" /></Base.ItemIndicator>
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
