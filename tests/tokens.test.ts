import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const css = fs.readFileSync(path.join(__dirname, "..", "src", "styles", "tokens.css"), "utf8");
const block = (sel: RegExp) => css.match(sel)?.[1] ?? "";
const light = block(/:root\s*\{([^}]*)\}/);
const dark = block(/prefers-color-scheme: dark\)\s*\{\s*:root\s*\{([^}]*)\}/);
const kiosk = block(/(?:^|\n)\.vs-kiosk\s*\{([^}]*)\}/);
const has = (body: string, name: string) => new RegExp(`${name}\\s*:`).test(body);
const value = (name: string) => (light + (css.match(/:root,\s*\.vs-kiosk\s*\{([^}]*)\}/)?.[1] ?? "")).match(new RegExp(`${name}\\s*:\\s*([^;]+);`))?.[1]?.trim();

const SPACE: Record<string, number> = { "0_5": 2, "1": 4, "1_5": 6, "2": 8, "3": 12, "4": 16, "5": 20, "6": 24, "8": 32, "10": 40, "12": 48 };
const TEXT: Record<string, [number, number]> = { xs: [12, 16], sm: [14, 20], md: [16, 24], lg: [20, 28], xl: [24, 32], "2xl": [32, 40], "3xl": [48, 52], "4xl": [72, 76] };
const RADIUS: Record<string, string> = { xs: "4px", sm: "8px", md: "12px", lg: "16px", xl: "24px", pill: "999px" };

describe("токены", () => {
  it("шкала отступов: шаг 4 px и полушаги 2 и 6 px, масштабируется в киоске", () => {
    for (const [k, px] of Object.entries(SPACE)) expect(value(`--vs-space-${k}`), k).toBe(`calc(${px}px * var(--vs-scale, 1))`);
  });
  it("шкала текста с межстрочным, масштабируется", () => {
    for (const [k, [size, lead]] of Object.entries(TEXT)) {
      expect(value(`--vs-text-${k}`), k).toBe(`calc(${size}px * var(--vs-scale, 1))`);
      expect(value(`--vs-leading-${k}`), k).toBe(`calc(${lead}px * var(--vs-scale, 1))`);
    }
    for (const w of ["regular", "medium", "semibold", "bold"]) expect(has(light, `--vs-weight-${w}`), w).toBe(true);
  });
  it("скругления — фиксированный набор, --vs-radius = md", () => {
    for (const [k, v] of Object.entries(RADIUS)) expect(value(`--vs-radius-${k}`), k).toBe(v);
    expect(value("--vs-radius")).toBe("var(--vs-radius-md)");
  });
  it("поверхности и мягкие статусы — в светлой и тёмной теме", () => {
    for (const body of [light, dark]) {
      for (const t of ["--vs-surface-0", "--vs-surface-1", "--vs-surface-2", "--vs-ok", "--vs-ok-soft", "--vs-warn-soft", "--vs-danger-soft"]) expect(has(body, t), t).toBe(true);
    }
  });
  it("киоск увеличивает шкалы в 1.25 раза", () => {
    expect(kiosk).toMatch(/--vs-scale\s*:\s*1\.25/);
  });
  it("шкалы пересчитываются внутри .vs-kiosk, а не только на :root", () => {
    const scaled = css.match(/:root,\s*\.vs-kiosk\s*\{([^}]*)\}/)?.[1] ?? "";
    for (const k of Object.keys(SPACE)) expect(has(scaled, `--vs-space-${k}`), k).toBe(true);
    for (const k of Object.keys(TEXT)) expect(has(scaled, `--vs-text-${k}`), k).toBe(true);
  });
});

describe("компоненты на шкалах", () => {
  const comp = (f: string) => fs.readFileSync(path.join(__dirname, "..", "src", "components", f), "utf8");
  it.each(["Segment.css", "Button.css", "Chip.css", "Icon.css", "Panel.css"])("%s — без литеральных отступов, радиусов и размеров текста", (f) => {
    const css = comp(f).replace(/calc\(\d+px \* var\(--vs-scale, 1\)\)/g, "").replace(/(outline|outline-offset|border(-top)?|letter-spacing): [^;]*/g, "");
    expect(css).not.toMatch(/\d+(\.\d+)?(px|rem|em)\b/);
  });
});
