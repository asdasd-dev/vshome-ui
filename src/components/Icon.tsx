import { cx } from "../utils/cx";
import { ICONS, type IconName } from "./icons";

export type IconProps = { name: IconName; size?: "sm" | "md" | "lg"; tone?: "lamp"; className?: string };

export function Icon({ name, size = "md", tone, className }: IconProps) {
  return (
    <svg data-icon={name} className={cx("vs-icon", `vs-icon--${size}`, tone && `vs-icon--${tone}`, className)} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={ICONS[name]} fill="currentColor" />
    </svg>
  );
}
