import type { ButtonHTMLAttributes, MouseEvent } from "react";
import type { IconName } from "./icons";
export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onClick"> & {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => unknown;
    icon: IconName;
    label: string;
    size?: "sm" | "md" | "lg";
    variant?: "secondary" | "primary" | "ghost" | "plain";
    loading?: boolean;
    pressed?: boolean;
};
export declare function IconButton({ icon, label, size, variant, loading, pressed, disabled, className, type, onClick, ...rest }: IconButtonProps): import("react").JSX.Element;
