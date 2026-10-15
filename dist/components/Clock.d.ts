import type { ReactNode } from "react";
export type ClockProps = {
    children: ReactNode;
    size?: "lg" | "xl" | "hero";
    weight?: "medium" | "semibold";
    align?: "start" | "center";
    className?: string;
};
export declare function Clock({ children, size, weight, align, className }: ClockProps): import("react").JSX.Element;
