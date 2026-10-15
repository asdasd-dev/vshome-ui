export declare const storage: {
    get(key: string, fallback: string): string;
    set(key: string, value: string): void;
};
export declare function useLocalStorage(key: string, initial: string): [string, (v: string) => void];
