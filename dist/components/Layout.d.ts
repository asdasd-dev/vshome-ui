import type { ReactNode } from "react";
type Gap = "1" | "2" | "3" | "4" | "6";
export type ClusterProps = {
    gap?: Gap;
    align?: "center" | "baseline" | "start" | "stretch";
    justify?: "start" | "center" | "between" | "end";
    wrap?: boolean;
    rigid?: boolean;
    as?: "div" | "span" | "header" | "footer";
    className?: string;
    children: ReactNode;
};
export declare function Cluster({ gap, align, justify, wrap, rigid, as: Tag, className, children }: ClusterProps): import("react").JSX.Element;
export type StackProps = {
    gap?: Gap;
    align?: "start" | "center" | "stretch";
    as?: "div" | "span";
    className?: string;
    children: ReactNode;
};
export declare function Stack({ gap, align, as: Tag, className, children }: StackProps): import("react").JSX.Element;
export type DividerProps = {
    vertical?: boolean;
    className?: string;
};
export declare function Divider({ vertical, className }: DividerProps): import("react").JSX.Element;
export {};
