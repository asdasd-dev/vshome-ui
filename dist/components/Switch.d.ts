import type { ReactNode } from "react";
export type SwitchProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    icon?: ReactNode;
    title?: string;
    size?: "sm" | "md";
    disabled?: boolean;
    className?: string;
};
export declare function Switch({ checked, onChange, label, icon, title, size, disabled, className }: SwitchProps): import("react").JSX.Element;
