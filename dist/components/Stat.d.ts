import type { ReactNode } from "react";
import type { IconName } from "./icons";
export type StatProps = {
    value: ReactNode;
    unit?: ReactNode;
    icon?: {
        name: IconName;
        label: string;
    };
    caption?: ReactNode;
    size?: "md" | "lg" | "xl";
    tone?: "default" | "muted" | "ok" | "warn" | "danger";
    className?: string;
};
export declare function Stat({ value, unit, icon, caption, size, tone, className }: StatProps): import("react").JSX.Element;
