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
    className?: string;
};
export declare function ControlRow({ label, control, children, className }: ControlRowProps): import("react").JSX.Element;
