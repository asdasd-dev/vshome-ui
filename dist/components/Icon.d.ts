import { type IconName } from "./icons";
export type IconProps = {
    name: IconName;
    size?: "sm" | "md" | "lg";
    className?: string;
};
export declare function Icon({ name, size, className }: IconProps): import("react").JSX.Element;
