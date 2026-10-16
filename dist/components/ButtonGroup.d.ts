import type { ReactNode } from "react";
export type ButtonGroupItem = {
    label: ReactNode;
    ariaLabel: string;
    onClick: () => void;
    disabled?: boolean;
};
export type ButtonGroupProps = {
    label: string;
    items: ButtonGroupItem[];
    className?: string;
};
export declare function ButtonGroup({ label, items, className }: ButtonGroupProps): import("react").JSX.Element;
