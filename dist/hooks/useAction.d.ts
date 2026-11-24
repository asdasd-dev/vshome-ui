export declare const ACTION_FAILED_MS = 2000;
export declare function useAction<A extends unknown[]>(handler: ((...args: A) => unknown) | undefined): {
    run: (...args: A) => void;
    pending: boolean;
    failed: boolean;
};
