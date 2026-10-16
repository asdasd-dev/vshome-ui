import type { ReactNode } from "react";
export type BannerProps = {
    tone?: "warn" | "danger" | "muted" | "accent" | "ok";
    variant?: "inline" | "box";
    title?: ReactNode;
    action?: ReactNode;
    truncate?: boolean;
    children: ReactNode;
    className?: string;
};
export declare function Banner({ tone, variant, title, action, truncate, children, className }: BannerProps): import("react").JSX.Element;
