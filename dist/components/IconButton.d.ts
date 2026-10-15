import type { ButtonHTMLAttributes } from "react";
import type { IconName } from "./icons";
export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    icon: IconName;
    label: string;
    size?: "md" | "lg";
    variant?: "plain" | "primary";
};
export declare function IconButton({ icon, label, size, variant, className, type, ...rest }: IconButtonProps): import("react").JSX.Element;
