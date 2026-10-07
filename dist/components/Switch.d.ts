import type { ReactNode } from "react";
export type SwitchProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    icon?: ReactNode;
    title?: string;
    size?: "sm" | "md";
    disabled?: boolean;
};
export declare function Switch({ checked, onChange, label, icon, title, size, disabled }: SwitchProps): import("react").JSX.Element;
