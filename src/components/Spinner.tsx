import { cx } from "../utils/cx";
import type { Tone } from "./tone";

export type SpinnerProps = { size?: "sm" | "md" | "lg"; tone?: Tone; label?: string; className?: string };

export function Spinner({ size = "md", tone, label, className }: SpinnerProps) {
  return <span className={cx("vs-spinner", `vs-spinner--${size}`, tone && `vs-icon--${tone}`, className)} {...(label ? { role: "status", "aria-label": label } : { "aria-hidden": true })} />;
}
