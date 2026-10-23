export declare const BREAKPOINTS: {
    readonly tablet: 760;
    readonly desktop: 1200;
};
export declare const MEDIA: {
    readonly phone: "(max-width: 759px)";
    readonly tablet: "(min-width: 760px) and (max-width: 1199px)";
    readonly desktop: "(min-width: 1200px)";
    readonly tabletUp: "(min-width: 760px)";
    readonly touch: "(pointer: coarse)";
    readonly hover: "(hover: hover)";
};
export type Breakpoint = "phone" | "tablet" | "desktop";
export type Responsive<T> = T | {
    phone?: T;
    tablet?: T;
    desktop?: T;
};
export declare function useBreakpoint(): Breakpoint;
export declare function responsiveVars<T extends string | number>(name: string, value: Responsive<T> | undefined): Record<string, string>;
