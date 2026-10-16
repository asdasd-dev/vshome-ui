export type ThemeChoice = "light" | "dark" | "system";
export type ThemeOptions = {
    key?: string;
    fallback?: ThemeChoice;
    themeColor?: {
        light: string;
        dark: string;
    };
};
export declare function readTheme(key?: string, fallback?: ThemeChoice): ThemeChoice;
export declare function applyTheme(choice: ThemeChoice): void;
export declare function themeBootScript(key?: string, fallback?: ThemeChoice): string;
export declare function useTheme({ key, fallback, themeColor }?: ThemeOptions): {
    value: ThemeChoice;
    set: (next: ThemeChoice) => void;
    resolved: "dark" | "light";
};
