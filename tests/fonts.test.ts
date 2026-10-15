import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const src = (f: string) => fs.readFileSync(path.join(__dirname, "..", "src", f), "utf8");

describe("шрифты", () => {
  it("шрифты не входят в style.css — подключаются отдельно через @vshome/ui/fonts.css", () => {
    expect(src("styles.css")).not.toMatch(/fonts\.css/);
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8"));
    expect(pkg.exports["./fonts.css"]).toBe("./dist/fonts.css");
  });
  it("сборка fonts.css встраивает woff2 как data: и не оставляет путей node_modules", async () => {
    // @ts-expect-error — scripts/fonts.mjs обычный node-модуль без типов
    const { inlineFonts } = await import("../scripts/fonts.mjs");
    const out: string = inlineFonts(path.join(__dirname, "..", "src", "styles"));
    expect(out.match(/@font-face/g)).toHaveLength(4);
    expect(out).toMatch(/url\(data:font\/woff2;base64,/);
    expect(out).not.toMatch(/node_modules/);
  });
  it("вариативные Manrope и Unbounded, только кириллица и латиница, без внешних адресов", () => {
    const css = src("styles/fonts.css");
    const faces = [...css.matchAll(/font-family: '([^']+)';[\s\S]*?url\(([^)]+)\)/g)].map((m) => `${m[1]} ${m[2]!.split("/").pop()}`);
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
