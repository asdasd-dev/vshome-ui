import type { ButtonHTMLAttributes } from "react";
import type { IconName } from "./icons";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "danger";
    size?: "sm" | "md";
    pressed?: boolean;
    icon?: IconName;
    indicator?: "lamp";
};
export declare function Button({ variant, size, pressed, icon, indicator, className, type, children, ...rest }: ButtonProps): import("react").JSX.Element;
