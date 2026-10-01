import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "showcase",
  plugins: [react()],
  server: { host: true, port: 5180 },
  preview: { port: 4173, headers: { "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'" } },
  build: { outDir: "../dist-showcase", emptyOutDir: true },
});
