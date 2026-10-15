import type { ReactNode } from "react";
export type BannerProps = {
    tone?: "warn" | "danger" | "muted";
    children: ReactNode;
    className?: string;
};
export declare function Banner({ tone, children, className }: BannerProps): import("react").JSX.Element;
