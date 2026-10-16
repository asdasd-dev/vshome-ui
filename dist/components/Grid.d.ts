import type { ReactNode } from "react";
import { type Responsive } from "../responsive";
export type GridProps = {
    children: ReactNode;
    cols?: Responsive<number>;
    min?: "2xs" | "xs" | "sm" | "md" | "lg";
    gap?: "2" | "3" | "4" | "6" | "8";
    dense?: boolean;
    as?: "div" | "ul" | "section";
    className?: string;
};
export declare function Grid({ children, cols, min, gap, dense, as: Tag, className }: GridProps): import("react").JSX.Element;
