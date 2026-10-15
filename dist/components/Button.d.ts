import type { ButtonHTMLAttributes } from "react";
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "danger";
};
export declare function Button({ variant, className, type, ...rest }: ButtonProps): import("react").JSX.Element;
