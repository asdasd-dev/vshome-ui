import { type IconName } from "./icons";
export type IconProps = {
    name: IconName;
    size?: "sm" | "md" | "lg";
    tone?: "lamp";
    label?: string;
    className?: string;
};
export declare function Icon({ name, size, tone, label, className }: IconProps): import("react").JSX.Element;
