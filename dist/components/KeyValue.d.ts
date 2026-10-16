import type { ReactNode } from "react";
import { type Responsive } from "../responsive";
export type KeyValueProps = {
    items: {
        label: ReactNode;
        value: ReactNode;
        hint?: ReactNode;
        tone?: "default" | "muted" | "ok" | "warn" | "danger";
    }[];
    cols?: Responsive<1 | 2 | 3 | 4> | "auto";
    size?: "sm" | "md";
    className?: string;
};
export declare function KeyValue({ items, cols, size, className }: KeyValueProps): import("react").JSX.Element;
