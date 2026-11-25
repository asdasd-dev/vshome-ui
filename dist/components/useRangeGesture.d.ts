import { type PointerEvent } from "react";
export declare const RANGE_SLOP = 8;
export type RangeGestureOptions = {
    min: number;
    max: number;
    step: number;
    vertical?: boolean;
    disabled?: boolean;
    onMove: (v: number) => void;
    onEnd: () => void;
};
export declare function useRangeGesture({ min, max, step, vertical, disabled, onMove, onEnd }: RangeGestureOptions): {
    onPointerDown: (e: PointerEvent<HTMLElement>) => void;
    onPointerMove: (e: PointerEvent<HTMLElement>) => void;
    onPointerUp: (e: PointerEvent<HTMLElement>) => void;
    onPointerCancel: () => void;
};
