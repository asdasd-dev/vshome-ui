import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: { entry: "src/index.ts", formats: ["es"], fileName: "index", cssFileName: "style" },
    rollupOptions: { external: [/^react($|\/)/, /^react-dom($|\/)/, /^@tanstack\/react-query($|\/)/, /^@base-ui\/react($|\/)/] },
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
