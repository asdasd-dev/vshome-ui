import { allCss } from "./css";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const css = fs.readFileSync(path.join(__dirname, "..", "src", "styles", "tokens.css"), "utf8");
const block = (sel: RegExp) => css.match(sel)?.[1] ?? "";
const light = block(/:root\s*\{([^}]*)\}/);
const dark = block(/prefers-color-scheme: dark\)\s*\{\s*:root:not\(\[data-theme="light"\]\)\s*\{([^}]*)\}/);
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
  const files = fs.readdirSync(path.join(__dirname, "..", "src", "components")).filter((f) => f.endsWith(".css"));
  it.each(files)("%s — без литеральных отступов, радиусов и размеров текста", (f) => {
    const css = comp(f).replace(/calc\(\d+px \* var\(--vs-scale, 1\)\)/g, "").replace(/(outline-offset|border(-top|-left|-bottom)?|letter-spacing): [^;]*/g, "").replace(/(width|height): 1em\b/g, "").replace(/font-size: max\(16px, 1rem\)/g, "").replace(/, 0px\)/g, ")").replace(/@(media|container)[^{]*\{/g, "");
    expect(css).not.toMatch(/\d+(\.\d+)?(px|rem|em)\b/);
  });
  it.each(files)("%s — цвета, тени, слои и движение только из токенов", (f) => {
    const css = comp(f);
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b|rgba?\(/i);
    expect(css).not.toMatch(/z-index: \d/);
    expect(css).not.toMatch(/(transition|transition-duration)[^;]*\b\d+m?s\b/);
    expect(css).not.toMatch(/box-shadow: \d/);
    expect(css).not.toMatch(/outline: \d+px/);
  });
  it("графики — на тех же правилах", () => {
    const css = fs.readFileSync(path.join(__dirname, "..", "src", "charts", "charts.css"), "utf8").replace(/calc\(\d+(\.\d+)?px \* var\(--vs-scale, 1\)\)/g, "").replace(/border(-top)?: [^;]*/g, "");
    expect(css).not.toMatch(/\d+(\.\d+)?(px|rem|em)\b/);
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b|rgba?\(|z-index: \d|font-weight: \d/i);
  });
});

describe("киоск и контраст", () => {
  const comp = (f: string) => fs.readFileSync(path.join(__dirname, "..", "src", "components", f), "utf8");
  it.each(["Button.css", "Chip.css", "Segment.css"])("%s — в киоске текст масштабируется", (f) => {
    expect(comp(f)).toMatch(/\.vs-kiosk[^{]*\{[^}]*(font-size|--vs-[a-z]+-size): var\(--vs-text-md\)/);
  });
  it("в светлой теме мягкий фон «внимания» не глушит текст: примесь 8%", () => {
    expect(light).toMatch(/--vs-warn-soft: color-mix\(in srgb, var\(--vs-warn\) 8%/);
  });
});

describe("Segment soft", () => {
  it("без рамки, капсулы, выбранный — мягкая поверхность", () => {
    const css = fs.readFileSync(path.join(__dirname, "..", "src", "components", "Segment.css"), "utf8");
    expect(css).toMatch(/\.vs-segment--soft \{[^}]*border-color: transparent[^}]*border-radius: var\(--vs-radius-pill\)/);
    expect(css).toMatch(/\.vs-segment--soft button\[aria-pressed="true"\] \{[^}]*background: var\(--vs-surface-2\)[^}]*color: var\(--vs-ink\)/);
  });
});

describe("Button в киоске", () => {
  const css = () => fs.readFileSync(path.join(__dirname, "..", "src", "components", "Button.css"), "utf8");
  const kiosk = () => css().match(/(?:^|\n)\.vs-kiosk \{([^}]*)\}/)?.[1] ?? "";
  it("как IconButton: капсула без рамки, мягкая поверхность, высота 44 — переменными на .vs-kiosk", () => {
    for (const d of ["--vs-button-line: transparent", "--vs-button-radius: var(--vs-radius-pill)", "--vs-button-surface: var(--vs-surface-2)", "--vs-button-h: calc(44px * var(--vs-scale, 1))", "--vs-button-size: var(--vs-text-md)"]) expect(kiosk(), d).toContain(d);
    expect(css()).toMatch(/\.vs-button--primary \{[^}]*--vs-button-bg: var\(--vs-accent\)/);
  });
  it("sm: ниже и мельче, высота 32", () => {
    expect(css()).toMatch(/\.vs-button--sm \{[^}]*--vs-button-h: calc\(32px \* var\(--vs-scale, 1\)\)[^}]*--vs-button-size: var\(--vs-text-sm\)/);
    expect(kiosk()).toContain("--vs-button-sm-px: var(--vs-space-4)");
  });
});

describe("киоск 0.6", () => {
  const read = (f: string) => fs.readFileSync(path.join(__dirname, "..", "src", "components", f), "utf8");
  it("нажатая кнопка в киоске подсвечена акцентом", () => {
    expect(read("Button.css")).toMatch(/(?:^|\n)\.vs-kiosk \{[^}]*--vs-button-pressed: var\(--vs-accent-soft\)/);
  });
  it("Sheet и Switch в киоске — на шкалах", () => {
    expect(read("Sheet.css")).toMatch(/(?:^|\n)\.vs-kiosk \{[^}]*--vs-sheet-radius: var\(--vs-radius-xl\)/);
    expect(read("Switch.css")).toMatch(/(?:^|\n)\.vs-kiosk \{[^}]*--vs-switch-w: calc\(56px \* var\(--vs-scale, 1\)\)/);
  });
  it("Slider без своих цветов", () => {
    expect(read("Slider.css")).not.toMatch(/#[0-9a-f]{3,8}\b/i);
  });
});

describe("Sheet: подложка", () => {
  it("размывает фон под попапом", () => {
    const css = fs.readFileSync(path.join(__dirname, "..", "src", "components", "Sheet.css"), "utf8");
    expect(css).toMatch(/\.vs-sheet-backdrop \{[^}]*-webkit-backdrop-filter: blur\(var\(--vs-backdrop-blur\)\)[^}]*backdrop-filter: blur\(var\(--vs-backdrop-blur\)\)/);
  });
});

describe("принудительная тема", () => {
  const darkBlock = (sel: string) => {
    const at = css.indexOf(sel);
    expect(at, sel).toBeGreaterThan(-1);
    const open = css.indexOf("{", at);
    return css.slice(open + 1, css.indexOf("}", open)).replace(/\s+/g, " ").trim();
  };
  it("data-theme=light отключает системную тёмную, data-theme=dark включает тёмную при светлой системе", () => {
    expect(css).toMatch(/@media \(prefers-color-scheme: dark\) \{\s*:root:not\(\[data-theme="light"\]\) \{/);
    expect(darkBlock(":root:not([data-theme=\"light\"])")).toBe(darkBlock(":root[data-theme=\"dark\"]"));
    expect(darkBlock(":root[data-theme=\"dark\"]")).toContain("color-scheme: dark");
  });
});

describe("компоненты без борьбы селекторов", () => {
  const read = (f: string) => fs.readFileSync(path.join(__dirname, "..", "src", "components", f), "utf8");
  it.each(fs.readdirSync(path.join(__dirname, "..", "src", "components")).filter((f) => f.endsWith(".css")))("%s: киоск задаёт только переменные на .vs-kiosk, модификаторы — на самом компоненте", (f) => {
    const css = read(f);
    expect(css).not.toMatch(/\.vs-kiosk \.|\.vs-kiosk\.|\.[a-z-_]+\.vs-kiosk/);
    const kiosk = css.match(/(?:^|\n)\.vs-kiosk \{([^}]*)\}/)?.[1] ?? "";
    expect(kiosk.split(";").map((d) => d.trim()).filter(Boolean).every((d) => d.startsWith("--vs-"))).toBe(true);
  });
});

describe("основы: токены теней, слоёв, движения, фокуса, состояний", () => {
  it("есть в светлой теме", () => {
    for (const t of ["--vs-shadow-popover", "--vs-scrim", "--vs-scrim-blur", "--vs-knob", "--vs-knob-shadow", "--vs-z-raised", "--vs-z-overlay", "--vs-z-sheet", "--vs-z-popover", "--vs-z-toast",
      "--vs-duration-fast", "--vs-duration-base", "--vs-duration-slow", "--vs-duration-sheet", "--vs-ease-sheet", "--vs-focus-ring", "--vs-accent-soft", "--vs-accent-tint", "--vs-accent-fill", "--vs-text-2xs", "--vs-leading-2xs"])
      expect(css, t).toMatch(new RegExp(`${t}\\s*:`));
  });
  it("у интерактивных элементов есть видимый фокус", () => {
    const all = allCss();
    for (const sel of [".vs-button", ".vs-icon-button", ".vs-chip", ".vs-segment button", ".vs-split button", ".vs-list-row__inner", ".vs-excerpt", ".vs-select__trigger", ".vs-switch input", ".vs-slider input"])
      expect(all, sel).toContain(`${sel}:focus-visible`);
  });
  it("иконки только из набора, без текстовых символов", () => {
    const dir = path.join(__dirname, "..", "src", "components");
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".tsx"))) expect(fs.readFileSync(path.join(dir, f), "utf8"), f).not.toMatch(/[✕✓▾▸×]/);
  });
});
