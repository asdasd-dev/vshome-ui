import type { ReactNode } from "react";
export type ContainerProps = {
    children: ReactNode;
    size?: "sm" | "md" | "lg" | "full";
    as?: "div" | "main" | "section";
    className?: string;
};
export declare function Container({ children, size, as: Tag, className }: ContainerProps): import("react").JSX.Element;
export type ShowProps = {
    children: ReactNode;
    above?: "tablet" | "desktop";
    below?: "tablet" | "desktop";
    className?: string;
};
export declare function Show({ children, above, below, className }: ShowProps): import("react").JSX.Element;
export type SidebarLayoutProps = {
    sidebar: ReactNode;
    children: ReactNode;
    side?: "start" | "end";
    width?: "sm" | "md";
    sticky?: boolean;
    collapse?: "tablet" | "desktop";
    sidebarFirst?: boolean;
    className?: string;
};
export declare function SidebarLayout({ sidebar, children, side, width, sticky, collapse, sidebarFirst, className }: SidebarLayoutProps): import("react").JSX.Element;
