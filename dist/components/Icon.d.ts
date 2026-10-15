import { type IconName } from "./icons";
export type IconProps = {
    name: IconName;
    size?: "sm" | "md" | "lg";
    tone?: "lamp";
    className?: string;
};
export declare function Icon({ name, size, tone, className }: IconProps): import("react").JSX.Element;
