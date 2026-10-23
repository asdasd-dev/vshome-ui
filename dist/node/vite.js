import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { themeBootScript, themeViolations } from "./theme-boot.js";
export { themeBootScript, themeViolations } from "./theme-boot.js";
export function vshomeBuild({ outDir, singleFile = false, proxy, theme = {} }) {
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
function themeGuard() {
    return {
        name: "vshome-theme-guard",
        enforce: "pre",
        transform(code, id) {
            const file = id.split("?")[0];
            if (id.startsWith("\0") || file.includes("/node_modules/") || !/\.(css|[cm]?[jt]sx?)$/.test(file) || /\.(test|spec)\.[cm]?[jt]sx?$/.test(file))
                return null;
            const found = themeViolations(code);
            if (found.length)
                this.error(`тема в обход @vshome/ui (docs/guidelines/07-themes-kiosk.md)\n${found.join("\n")}`);
            return null;
        },
    };
}
// сервер personalai запрещает инлайн-скрипты (CSP script-src 'self'), поэтому без singleFile скрипт — отдельный файл
function themeBoot(theme, inline) {
    const code = themeBootScript(theme);
    const file = `assets/theme-boot-${createHash("sha256").update(code).digest("hex").slice(0, 8)}.js`;
    let base = "/";
    let serve = false;
    return {
        name: "vshome-theme-boot",
        configResolved(c) { base = c.base; serve = c.command === "serve"; },
        buildStart() { if (!inline && !serve)
            this.emitFile({ type: "asset", fileName: file, source: code }); },
        transformIndexHtml: () => [inline || serve
                ? { tag: "script", children: code, injectTo: "head-prepend" }
                : { tag: "script", attrs: { src: base + file }, injectTo: "head-prepend" }],
    };
}
export const sharedTestSetup = fileURLToPath(new URL("./test-setup.js", import.meta.url));
export function vshomeTest({ setupFiles = [] } = {}) {
    return {
        environment: "jsdom",
        globals: true,
        setupFiles: [sharedTestSetup, ...setupFiles],
        env: { TZ: "Europe/Moscow" },
    };
}
