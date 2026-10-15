import { cx } from "../utils/cx";
import { ICONS, type IconName } from "./icons";

export type IconProps = { name: IconName; size?: "sm" | "md" | "lg"; className?: string };

export function Icon({ name, size = "md", className }: IconProps) {
  return (
    <svg data-icon={name} className={cx("vs-icon", `vs-icon--${size}`, className)} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={ICONS[name]} fill="currentColor" />
    </svg>
  );
}
