import type { UserConfig } from "vite";
import type { ViteUserConfig } from "vitest/config";
import { type ThemeConfig } from "./theme-boot.js";
export { themeBootScript, themeViolations, type ThemeChoice, type ThemeConfig } from "./theme-boot.js";
export type VshomeBuildOptions = {
    outDir: string;
    /** весь JS и CSS внутри одного HTML — для сайтов, чей сервер читает ровно один файл */
    singleFile?: boolean;
    /** адрес API для `vite dev`: запросы /api уходят туда */
    proxy?: string;
    /** те же key и fallback, что у useTheme; false — data-theme на <html> ставит сам сайт (киоск, всегда тёмный дашборд) */
    theme?: ThemeConfig | false;
};
export declare function vshomeBuild({ outDir, singleFile, proxy, theme }: VshomeBuildOptions): UserConfig;
export declare const sharedTestSetup: string;
export declare function vshomeTest({ setupFiles }?: {
    setupFiles?: string[];
}): NonNullable<ViteUserConfig["test"]>;
