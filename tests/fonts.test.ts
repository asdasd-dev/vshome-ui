import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const src = (f: string) => fs.readFileSync(path.join(__dirname, "..", "src", f), "utf8");

describe("шрифты", () => {
  it("styles.css подключает шрифты системы", () => {
    expect(src("styles.css")).toMatch(/@import "\.\/styles\/fonts\.css";/);
  });
  it("вариативные Manrope и Unbounded, только кириллица и латиница, без внешних адресов", () => {
    const css = src("styles/fonts.css");
    const faces = [...css.matchAll(/font-family: '([^']+)';[\s\S]*?url\(([^)]+)\)/g)].map((m) => `${m[1]} ${m[2].split("/").pop()}`);
    expect(faces.sort()).toEqual([
      "Manrope manrope-cyrillic-wght-normal.woff2", "Manrope manrope-latin-wght-normal.woff2",
      "Unbounded unbounded-cyrillic-wght-normal.woff2", "Unbounded unbounded-latin-wght-normal.woff2",
    ]);
    expect(css).not.toMatch(/https?:/);
  });
  it("body набран шрифтом системы", () => {
    expect(src("styles/base.css")).toMatch(/body\s*\{[^}]*font-family:\s*var\(--vs-font\)/);
  });
});
