import type { ReactNode } from "react";
export type KeyValueProps = {
    items: {
        label: ReactNode;
        value: ReactNode;
        hint?: ReactNode;
        tone?: "default" | "muted" | "ok" | "warn" | "danger";
    }[];
    cols?: 1 | 2 | 3 | 4;
    size?: "sm" | "md";
    className?: string;
};
export declare function KeyValue({ items, cols, size, className }: KeyValueProps): import("react").JSX.Element;
