import { cx } from "../utils/cx";

export type SpinnerProps = { size?: "sm" | "md" | "lg"; label?: string; className?: string };

export function Spinner({ size = "md", label, className }: SpinnerProps) {
  return <span className={cx("vs-spinner", `vs-spinner--${size}`, className)} {...(label ? { role: "status", "aria-label": label } : { "aria-hidden": true })} />;
}
