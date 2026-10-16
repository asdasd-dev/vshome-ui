import type { IconName } from "./icons";
export type SliderProps = {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    label: string;
    onCommit: (v: number) => void;
    format?: (v: number) => string;
    icon?: IconName;
    variant?: "bar" | "line";
    orientation?: "horizontal" | "vertical";
    disabled?: boolean;
    className?: string;
};
export declare function Slider({ value, min, max, step, label, onCommit, format, icon, variant, orientation, disabled, className }: SliderProps): import("react").JSX.Element;
