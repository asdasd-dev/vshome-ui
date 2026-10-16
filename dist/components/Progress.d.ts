import type { Tone } from "./tone";
export type ProgressProps = {
    value: number;
    max?: number;
    label: string;
    tone?: Tone;
    size?: "sm" | "md";
    className?: string;
};
export declare function Progress({ value, max, label, tone, size, className }: ProgressProps): import("react").JSX.Element;
export type SplitBarProps = {
    parts: {
        value: number;
        label: string;
        tone?: Tone;
        color?: string;
    }[];
    label: string;
    size?: "sm" | "md";
    className?: string;
};
export declare function SplitBar({ parts, label, size, className }: SplitBarProps): import("react").JSX.Element;
