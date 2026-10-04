import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
export function vshomeBuild({ outDir, singleFile = false, proxy }) {
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
export function vshomeTest({ setupFiles = [] } = {}) {
    return {
        environment: "jsdom",
        globals: true,
        setupFiles: [sharedTestSetup, ...setupFiles],
        env: { TZ: "Europe/Moscow" },
    };
}
