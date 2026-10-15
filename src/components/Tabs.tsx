import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { Badge } from "./Badge";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

export type TabItem<T extends string> = { value: T; label: ReactNode; icon?: IconName; count?: number; href?: string };

export type TabsProps<T extends string> = {
  items: TabItem<T>[]; value: T; onChange?: (v: T) => void; label: string; variant?: "underline" | "bottom"; sticky?: boolean; className?: string;
};

export function Tabs<T extends string>({ items, value, onChange, label, variant = "underline", sticky, className }: TabsProps<T>) {
  const cls = cx("vs-tabs", `vs-tabs--${variant}`, sticky && "vs-tabs--sticky", className);
  const inner = (i: TabItem<T>) => <>
    {i.icon && <Icon name={i.icon} size="md" />}
    <span className="vs-tabs__label">{i.label}</span>
    {i.count != null && <Badge tone={i.value === value ? "accent" : "muted"}>{i.count}</Badge>}
  </>;
  if (items.some((i) => i.href != null)) {
    return (
      <nav aria-label={label} className={cls}>
        {items.map((i) => <a key={i.value} className="vs-tabs__item" href={i.href} aria-current={i.value === value ? "page" : undefined} onClick={onChange ? () => onChange(i.value) : undefined}>{inner(i)}</a>)}
      </nav>
    );
  }
  return (
    <div role="tablist" aria-label={label} className={cls}>
      {items.map((i) => <button key={i.value} type="button" role="tab" className="vs-tabs__item" aria-selected={i.value === value} onClick={() => onChange?.(i.value)}>{inner(i)}</button>)}
    </div>
  );
}
