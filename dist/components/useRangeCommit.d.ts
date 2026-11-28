export type RangeCommitOptions = {
    min: number;
    max: number;
    step: number;
    vertical?: boolean;
    disabled?: boolean;
};
export declare function useRangeCommit(value: number, onCommit: (v: number) => void, range: RangeCommitOptions): {
    v: number;
    input: {
        value: number;
        onChange: (e: {
            target: {
                value: string;
            };
        }) => void;
        onKeyUp: () => void;
        onBlur: () => void;
    };
    track: {
        onPointerDown: (e: import("react").PointerEvent<HTMLElement>) => void;
        onPointerMove: (e: import("react").PointerEvent<HTMLElement>) => void;
        onPointerUp: (e: import("react").PointerEvent<HTMLElement>) => void;
        onPointerCancel: () => void;
    };
};
