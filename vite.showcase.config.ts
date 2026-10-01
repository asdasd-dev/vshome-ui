import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "showcase",
  plugins: [react()],
  server: { host: true, port: 5180 },
  build: { outDir: "../dist-showcase", emptyOutDir: true },
});
