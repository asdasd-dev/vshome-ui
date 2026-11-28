import type { Tone } from "./tone";
export type SpinnerProps = {
    size?: "sm" | "md" | "lg" | "em";
    tone?: Tone;
    label?: string;
    className?: string;
};
export declare function Spinner({ size, tone, label, className }: SpinnerProps): import("react").JSX.Element;
