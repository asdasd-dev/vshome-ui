export declare function useRangeCommit(value: number, onCommit: (v: number) => void): {
    v: number;
    input: {
        value: number;
        onPointerDown: () => void;
        onChange: (e: {
            target: {
                value: string;
            };
        }) => void;
        onPointerUp: () => void;
        onPointerCancel: () => void;
        onKeyUp: () => void;
        onTouchEnd: () => void;
    };
};
