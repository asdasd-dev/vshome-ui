import type { ButtonHTMLAttributes } from "react";
import type { IconName } from "./icons";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost" | "danger" | "warn";
    size?: "sm" | "md" | "lg";
    shape?: "default" | "pill";
    block?: boolean;
    loading?: boolean;
    pressed?: boolean;
    icon?: IconName;
    indicator?: "lamp";
};
export declare function Button({ variant, size, shape, block, loading, pressed, icon, indicator, disabled, className, type, children, ...rest }: ButtonProps): import("react").JSX.Element;
