import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: { entry: { index: "src/index.ts", charts: "src/charts/index.ts" }, formats: ["es"], cssFileName: "style" },
    rollupOptions: { output: { chunkFileNames: "[name].js" }, external: [/^react($|\/)/, /^react-dom($|\/)/, /^@tanstack\/react-query($|\/)/, /^@base-ui\/react($|\/)/] },
    emptyOutDir: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["tests/setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    env: { TZ: "Europe/Moscow" },
  },
});
