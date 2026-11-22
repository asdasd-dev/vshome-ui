import { type ThemeChoice, type ThemeConfig } from "../node/theme-boot";
export { themeBootScript, type ThemeChoice, type ThemeConfig } from "../node/theme-boot";
export type ThemeOptions = ThemeConfig & {
    themeColor?: {
        light: string;
        dark: string;
    };
};
export declare function readTheme({ key, fallback }?: ThemeConfig): ThemeChoice;
export declare function useSystemTheme(): "light" | "dark";
export declare function useTheme({ key, fallback, themeColor }?: ThemeOptions): {
    choice: ThemeChoice;
    set: (next: ThemeChoice) => void;
    resolved: "dark" | "light";
};
