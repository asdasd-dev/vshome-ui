export type SliderProps = {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    label: string;
    onCommit: (v: number) => void;
    format?: (v: number) => string;
    disabled?: boolean;
    className?: string;
};
export declare function Slider({ value, min, max, step, label, onCommit, format, disabled, className }: SliderProps): import("react").JSX.Element;
