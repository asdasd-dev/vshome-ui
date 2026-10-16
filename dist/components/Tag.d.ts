import type { ReactNode } from "react";
import type { IconName } from "./icons";
export type TagProps = {
    children: ReactNode;
    tone?: "default" | "accent" | "ok" | "warn" | "danger" | "muted" | "violet" | "pink" | "gold";
    variant?: "soft" | "outline";
    size?: "sm" | "md";
    icon?: IconName;
    className?: string;
};
export declare function Tag({ children, tone, variant, size, icon, className }: TagProps): import("react").JSX.Element;
