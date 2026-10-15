import type { ReactNode } from "react";
export type BannerProps = {
    tone?: "warn" | "danger" | "muted";
    truncate?: boolean;
    children: ReactNode;
    className?: string;
};
export declare function Banner({ tone, truncate, children, className }: BannerProps): import("react").JSX.Element;
