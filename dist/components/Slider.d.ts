export type SliderProps = {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    label: string;
    onCommit: (v: number) => void;
    format?: (v: number) => string;
    className?: string;
};
export declare function Slider({ value, min, max, step, label, onCommit, format, className }: SliderProps): import("react").JSX.Element;
