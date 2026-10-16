import { useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "../utils/cx";
import { Badge } from "./Badge";
import { Icon } from "./Icon";

export type ChipProps = {
  children: ReactNode; pressed?: boolean; onClick?: () => void; href?: string; size?: "sm" | "md"; disabled?: boolean; count?: number;
  external?: boolean; title?: string; className?: string;
};

export function Chip({ children, pressed, onClick, href, size = "md", disabled, count, external, title, className }: ChipProps) {
  const cls = cx("vs-chip", size === "sm" && "vs-chip--sm", className);
  const inner = <>{children}{count != null && <Badge tone={pressed ? "accent" : "muted"}>{count}</Badge>}</>;
  if (href != null) return <a className={cls} href={href} title={title} aria-current={pressed ? "page" : undefined} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}{external && <Icon name="external" size="em" />}</a>;
  return (
    <button type="button" className={cls} aria-pressed={pressed === undefined ? undefined : pressed} onClick={onClick} title={title} disabled={disabled}>
      {inner}
    </button>
  );
}

export type ChipGroupProps<T extends string> = {
  options: { value: T; label: ReactNode; count?: number; disabled?: boolean }[]; value: T; onChange: (v: T) => void; label: string;
  scroll?: boolean; size?: "sm" | "md"; className?: string;
};

export function ChipGroup<T extends string>({ options, value, onChange, label, scroll, size, className }: ChipGroupProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const [fade, setFade] = useState({ start: false, end: false });
  useEffect(() => {
    const el = ref.current;
    if (!scroll || !el) return;
    const update = () => {
      const start = el.scrollLeft > 1, end = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
      setFade((f) => (f.start === start && f.end === end ? f : { start, end }));
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    ro?.observe(el);
    return () => { el.removeEventListener("scroll", update); ro?.disconnect(); };
  }, [scroll, options.length]);
  return (
    <div role="group" aria-label={label} ref={ref}
         className={cx("vs-chip-group", scroll && "vs-chip-group--scroll", scroll && fade.start && "vs-chip-group--fade-start", scroll && fade.end && "vs-chip-group--fade-end", className)}>
      {options.map((o) => <Chip key={o.value} size={size} pressed={o.value === value} count={o.count} disabled={o.disabled} onClick={() => onChange(o.value)}>{o.label}</Chip>)}
    </div>
  );
}
