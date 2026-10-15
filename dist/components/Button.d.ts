import type { ButtonHTMLAttributes } from "react";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "danger";
    pressed?: boolean;
};
export declare function Button({ variant, pressed, className, type, ...rest }: ButtonProps): import("react").JSX.Element;
