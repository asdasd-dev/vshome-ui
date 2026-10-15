export declare function niceMax(max: number): number;
/** t0 и step — в секундах */
export declare function dayTicks(t0: number, step: number, n: number, every?: number): number[];
export declare function outageBands(alive: (number | null)[]): [number, number][];
export declare function linePath(data: (number | null)[], x: (i: number) => number, y: (v: number) => number, connect: boolean): string;
/** t — в секундах */
export declare function fmtStamp(t: number): string;
