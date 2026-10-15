import type { ReactNode } from "react";
export type SegmentProps<T extends string> = {
    options: {
        value: T;
        label: ReactNode;
        disabled?: boolean;
    }[];
    value: T;
    onChange: (v: T) => void;
    variant?: "default" | "soft";
    size?: "sm" | "md";
    className?: string;
} & ({
    label: string;
    ariaLabel?: never;
} | {
    /** @deprecated переименовано в label */
    ariaLabel: string;
    label?: never;
});
export declare function Segment<T extends string>({ options, value, onChange, label, ariaLabel, variant, size, className }: SegmentProps<T>): import("react").JSX.Element;
