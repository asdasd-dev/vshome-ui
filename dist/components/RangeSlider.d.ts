import type { Tone } from "./tone";
export type RangeSliderProps = {
    label: string;
    value: [number, number];
    onCommit: (lo: number, hi: number) => void;
    min?: number;
    max?: number;
    step?: number;
    format?: (v: number) => string;
    onChange?: (lo: number, hi: number) => void;
    tone?: Tone;
    disabled?: boolean;
    className?: string;
};
export declare function RangeSlider({ label, value, onCommit, min, max, step, format, onChange, tone, disabled, className }: RangeSliderProps): import("react").JSX.Element;
