import type { ReactNode } from "react";
export type ControlListProps = {
    children: ReactNode;
    className?: string;
};
export declare function ControlList({ children, className }: ControlListProps): import("react").JSX.Element;
export type ControlRowProps = {
    label: ReactNode;
    control: ReactNode;
    children?: ReactNode;
    inline?: boolean;
    className?: string;
};
export declare function ControlRow({ label, control, children, inline, className }: ControlRowProps): import("react").JSX.Element;
