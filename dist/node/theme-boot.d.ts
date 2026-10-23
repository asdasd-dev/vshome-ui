export type ThemeChoice = "light" | "dark" | "system";
export type ThemeConfig = {
    key?: string;
    fallback?: ThemeChoice;
};
export declare const THEME_DEFAULTS: {
    readonly key: "vs-theme";
    readonly fallback: "system";
};
export declare const SYSTEM_DARK = "(prefers-color-scheme: dark)";
export declare function themeBootScript({ key, fallback }?: ThemeConfig): string;
export declare function themeViolations(code: string): string[];
