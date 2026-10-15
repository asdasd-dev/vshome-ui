#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function inlineFonts(stylesDir) {
  const css = fs.readFileSync(path.join(stylesDir, "fonts.css"), "utf8");
  return css.replace(/url\(([^)]+\.woff2)\)/g, (_, rel) => {
    const data = fs.readFileSync(path.resolve(stylesDir, rel)).toString("base64");
    return `url(data:font/woff2;base64,${data})`;
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
  fs.writeFileSync(path.join(root, "dist", "fonts.css"), inlineFonts(path.join(root, "src", "styles")));
}
