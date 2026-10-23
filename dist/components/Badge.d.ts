import type { ReactNode } from "react";
export type BadgeProps = {
    children?: ReactNode;
    tone?: "accent" | "muted" | "ok" | "warn" | "danger";
    max?: number;
    dot?: boolean;
    label?: string;
    className?: string;
};
export declare function Badge({ children, tone, max, dot, label, className }: BadgeProps): import("react").JSX.Element | null;
