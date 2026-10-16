import type { ReactNode } from "react";
import type { IconName } from "./icons";
export type EmptyStateProps = {
    title?: ReactNode;
    children?: ReactNode;
    action?: ReactNode;
    icon?: IconName;
    size?: "sm" | "md";
    className?: string;
};
export declare function EmptyState({ title, children, action, icon, size, className }: EmptyStateProps): import("react").JSX.Element;
