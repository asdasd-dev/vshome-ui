import { type ReactNode } from "react";
export type CheckboxProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: ReactNode;
    hint?: ReactNode;
    size?: "md" | "lg";
    disabled?: boolean;
    className?: string;
};
export declare function Checkbox({ checked, onChange, label, hint, size, disabled, className }: CheckboxProps): import("react").JSX.Element;
export type RadioGroupProps<T extends string> = {
    legend: string;
    options: {
        value: T;
        label: ReactNode;
        hint?: ReactNode;
        disabled?: boolean;
    }[];
    value: T;
    onChange: (v: T) => void;
    direction?: "column" | "row";
    hideLegend?: boolean;
    className?: string;
};
export declare function RadioGroup<T extends string>({ legend, options, value, onChange, direction, hideLegend, className }: RadioGroupProps<T>): import("react").JSX.Element;
