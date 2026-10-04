import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import type { UserConfig } from "vite";
import type { ViteUserConfig } from "vitest/config";

export type VshomeBuildOptions = {
  outDir: string;
  /** весь JS и CSS внутри одного HTML — для сайтов, чей сервер читает ровно один файл */
  singleFile?: boolean;
  /** адрес API для `vite dev`: запросы /api уходят туда */
  proxy?: string;
};

export function vshomeBuild({ outDir, singleFile = false, proxy }: VshomeBuildOptions): UserConfig {
  return {
    plugins: [react(), ...(singleFile ? [viteSingleFile()] : [])],
    build: {
      outDir,
      // base64-хеш однажды дал index-ad-qnYBE.css, и блокировщики рекламы отрезали стили доски
      rollupOptions: { output: { hashCharacters: "hex" } },
    },
    ...(proxy ? { server: { proxy: { "/api": { target: proxy, changeOrigin: true } } } } : {}),
  };
}

export const sharedTestSetup = fileURLToPath(new URL("./test-setup.js", import.meta.url));

export function vshomeTest({ setupFiles = [] }: { setupFiles?: string[] } = {}): NonNullable<ViteUserConfig["test"]> {
  return {
    environment: "jsdom",
    globals: true,
    setupFiles: [sharedTestSetup, ...setupFiles],
    env: { TZ: "Europe/Moscow" },
  };
}
