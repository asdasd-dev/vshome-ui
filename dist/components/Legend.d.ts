import type { ReactNode } from "react";
type Tone = "accent" | "ok" | "warn" | "danger" | "muted" | "violet" | "pink" | "gold";
export type LegendProps = {
    items: {
        label: ReactNode;
        tone?: Tone;
        color?: string;
        shape?: "dot" | "line" | "dash" | "square";
    }[];
    className?: string;
};
export declare function Legend({ items, className }: LegendProps): import("react").JSX.Element;
export type StatusDotProps = {
    tone: "ok" | "warn" | "danger" | "muted" | "accent";
    pulse?: boolean;
    label?: string;
    className?: string;
};
export declare function StatusDot({ tone, pulse, label, className }: StatusDotProps): import("react").JSX.Element;
export {};
