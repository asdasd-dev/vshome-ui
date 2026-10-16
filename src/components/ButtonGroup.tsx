import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type ButtonGroupItem = { label: ReactNode; ariaLabel: string; onClick: () => void; disabled?: boolean };
export type ButtonGroupProps = { label: string; items: ButtonGroupItem[]; size?: "md" | "sm"; className?: string };

export function ButtonGroup({ label, items, size = "md", className }: ButtonGroupProps) {
  return (
    <span role="group" aria-label={label} className={cx("vs-button-group", size === "sm" && "vs-button-group--sm", className)}>
      <span className="vs-button-group__label" aria-hidden="true">{label}</span>
      {items.map((x) => (
        <button key={x.ariaLabel} type="button" className="vs-button-group__item" aria-label={x.ariaLabel} title={x.ariaLabel} disabled={x.disabled} onClick={x.onClick}>{x.label}</button>
      ))}
    </span>
  );
}
