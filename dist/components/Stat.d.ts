import type { ReactNode } from "react";
export type StatProps = {
    value: ReactNode;
    unit?: ReactNode;
    caption?: ReactNode;
    size?: "md" | "lg" | "xl";
    tone?: "default" | "muted" | "ok" | "warn" | "danger";
    className?: string;
};
export declare function Stat({ value, unit, caption, size, tone, className }: StatProps): import("react").JSX.Element;
