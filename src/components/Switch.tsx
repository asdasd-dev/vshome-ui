import type { ReactNode, SyntheticEvent } from "react";
import { cx } from "../utils/cx";

export type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  icon?: ReactNode;
  title?: string;
  size?: "sm" | "md";
  disabled?: boolean;
};

const stop = (e: SyntheticEvent) => e.stopPropagation();

export function Switch({ checked, onChange, label, icon, title, size = "md", disabled }: SwitchProps) {
  return (
    <label className={cx("vs-switch", size === "sm" && "vs-switch--sm")} title={title} onClick={stop} onKeyDown={stop} onPointerDown={stop}>
      {icon != null && <span aria-hidden="true">{icon}</span>}
      <input type="checkbox" role="switch" aria-label={label} checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}
