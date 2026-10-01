import type { ReactNode } from "react";
export type ChipProps = {
    pressed?: boolean;
    onClick?: () => void;
    children: ReactNode;
    className?: string;
    title?: string;
};
export declare function Chip({ pressed, onClick, children, className, title }: ChipProps): import("react").JSX.Element;
