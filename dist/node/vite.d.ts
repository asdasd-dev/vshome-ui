import type { UserConfig } from "vite";
import type { ViteUserConfig } from "vitest/config";
export type VshomeBuildOptions = {
    outDir: string;
    /** весь JS и CSS внутри одного HTML — для сайтов, чей сервер читает ровно один файл */
    singleFile?: boolean;
    /** адрес API для `vite dev`: запросы /api уходят туда */
    proxy?: string;
};
export declare function vshomeBuild({ outDir, singleFile, proxy }: VshomeBuildOptions): UserConfig;
export declare const sharedTestSetup: string;
export declare function vshomeTest({ setupFiles }?: {
    setupFiles?: string[];
}): NonNullable<ViteUserConfig["test"]>;
