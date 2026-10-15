import type { ButtonHTMLAttributes } from "react";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "danger";
    size?: "sm" | "md";
    pressed?: boolean;
};
export declare function Button({ variant, size, pressed, className, type, ...rest }: ButtonProps): import("react").JSX.Element;
