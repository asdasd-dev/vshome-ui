import type { ReactNode } from "react";
import { type Responsive } from "../responsive";
export type GridProps = {
    children: ReactNode;
    cols?: Responsive<number>;
    min?: "2xs" | "xs" | "sm" | "md" | "lg";
    gap?: "2" | "3" | "4" | "6" | "8";
    as?: "div" | "ul" | "section";
    className?: string;
};
export declare function Grid({ children, cols, min, gap, as: Tag, className }: GridProps): import("react").JSX.Element;
