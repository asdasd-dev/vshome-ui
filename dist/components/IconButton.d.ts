import type { ButtonHTMLAttributes } from "react";
import type { IconName } from "./icons";
export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    icon: IconName;
    label: string;
    size?: "sm" | "md" | "lg";
    variant?: "secondary" | "primary" | "ghost" | "plain";
    loading?: boolean;
};
export declare function IconButton({ icon, label, size, variant, loading, disabled, className, type, ...rest }: IconButtonProps): import("react").JSX.Element;
