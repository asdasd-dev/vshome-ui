import type { ReactNode } from "react";
export type ChipProps = {
    children: ReactNode;
    pressed?: boolean;
    onClick?: () => void;
    href?: string;
    size?: "sm" | "md";
    disabled?: boolean;
    count?: number;
    title?: string;
    className?: string;
};
export declare function Chip({ children, pressed, onClick, href, size, disabled, count, title, className }: ChipProps): import("react").JSX.Element;
export type ChipGroupProps<T extends string> = {
    options: {
        value: T;
        label: ReactNode;
        count?: number;
    }[];
    value: T;
    onChange: (v: T) => void;
    label: string;
    scroll?: boolean;
    size?: "sm" | "md";
    className?: string;
};
export declare function ChipGroup<T extends string>({ options, value, onChange, label, scroll, size, className }: ChipGroupProps<T>): import("react").JSX.Element;
