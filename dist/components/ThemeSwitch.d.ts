import type { ThemeChoice } from "../hooks/useTheme";
export type ThemeSwitchProps = {
    value: ThemeChoice;
    onChange: (v: ThemeChoice) => void;
    variant?: "segment" | "button";
    size?: "sm" | "md";
    label?: string;
    className?: string;
};
export declare function ThemeSwitch({ value, onChange, variant, size, label, className }: ThemeSwitchProps): import("react").JSX.Element;
