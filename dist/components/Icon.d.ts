import { type IconName } from "./icons";
import type { Tone } from "./tone";
export type IconProps = {
    name: IconName;
    size?: "sm" | "md" | "lg" | "em";
    tone?: Tone | "lamp";
    label?: string;
    className?: string;
};
export declare function Icon({ name, size, tone, label, className }: IconProps): import("react").JSX.Element;
