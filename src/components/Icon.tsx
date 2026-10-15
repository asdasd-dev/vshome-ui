import { cx } from "../utils/cx";
import { ICONS, type IconName } from "./icons";

export type IconProps = { name: IconName; size?: "sm" | "md" | "lg"; tone?: "lamp"; label?: string; className?: string };

export function Icon({ name, size = "md", tone, label, className }: IconProps) {
  return (
    <svg data-icon={name} className={cx("vs-icon", `vs-icon--${size}`, tone && `vs-icon--${tone}`, className)} viewBox="0 0 24 24" focusable="false" {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}>
      <path d={ICONS[name]} fill="currentColor" />
    </svg>
  );
}
