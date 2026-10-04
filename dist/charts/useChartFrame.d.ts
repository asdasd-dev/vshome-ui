import { type RefObject } from "react";
export declare const CHART_H = 170;
export declare const PAD: {
    readonly L: 40;
    readonly R: 12;
    readonly T: 10;
    readonly B: 22;
};
export declare function useWidth(): [RefObject<HTMLDivElement | null>, number];
export type TipPos = {
    px: number;
    boxW: number;
    gap: number;
};
export declare function useTipLeft(pos: TipPos | null): RefObject<HTMLDivElement | null>;
export declare function pointerX(ev: React.MouseEvent | React.TouchEvent, svg: SVGSVGElement): {
    px: number;
    boxW: number;
};
