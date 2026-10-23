import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import type { Plugin, UserConfig } from "vite";
import type { ViteUserConfig } from "vitest/config";
import { themeBootScript, themeViolations, type ThemeConfig } from "./theme-boot.js";

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

export function vshomeBuild({ outDir, singleFile = false, proxy, theme = {} }: VshomeBuildOptions): UserConfig {
  return {
    plugins: [react(), themeGuard(), ...(theme ? [themeBoot(theme, singleFile)] : []), ...(singleFile ? [viteSingleFile()] : [])],
    build: {
      outDir,
      // base64-хеш однажды дал index-ad-qnYBE.css, и блокировщики рекламы отрезали стили доски
      rollupOptions: { output: { hashCharacters: "hex" } },
    },
    ...(proxy ? { server: { proxy: { "/api": { target: proxy, changeOrigin: true } } } } : {}),
  };
}

function themeGuard(): Plugin {
  return {
    name: "vshome-theme-guard",
    enforce: "pre",
    transform(code, id) {
      const file = id.split("?")[0]!;
      if (id.startsWith("\0") || file.includes("/node_modules/") || !/\.(css|[cm]?[jt]sx?)$/.test(file)) return null;
      const found = themeViolations(code);
      if (found.length) this.error(`${file}: тема в обход @vshome/ui (docs/guidelines/07-themes-kiosk.md)\n${found.join("\n")}`);
      return null;
    },
  };
}

// сервер personalai запрещает инлайн-скрипты (CSP script-src 'self'), поэтому без singleFile скрипт — отдельный файл
function themeBoot(theme: ThemeConfig, inline: boolean): Plugin {
  const code = themeBootScript(theme);
  const file = `assets/theme-boot-${createHash("sha256").update(code).digest("hex").slice(0, 8)}.js`;
  let base = "/";
  let serve = false;
  return {
    name: "vshome-theme-boot",
    configResolved(c) { base = c.base; serve = c.command === "serve"; },
    buildStart() { if (!inline && !serve) this.emitFile({ type: "asset", fileName: file, source: code }); },
    transformIndexHtml: () => [inline || serve
      ? { tag: "script", children: code, injectTo: "head-prepend" }
      : { tag: "script", attrs: { src: base + file }, injectTo: "head-prepend" }],
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
