import { readFileSync } from "node:fs";

const css = readFileSync("src/styles/tokens.css", "utf8");
const block = (head: string) => css.slice(css.indexOf(head), css.indexOf("}", css.indexOf(head)));
const LIGHT = block(":root {");
const DARK = block(':root[data-theme="dark"] {');
const hex = (src: string, name: string) => new RegExp(`--vs-${name}: (#[0-9a-f]{6})`).exec(src)?.[1];
const soft = (tone: string) => (tone === "accent" ? "accent-tint" : `${tone}-soft`);
const share = (src: string, tone: string) => Number(new RegExp(`--vs-${soft(tone)}: color-mix\\(in srgb, var\\(--vs-${tone}\\) (\\d+)%`).exec(src)?.[1] ?? 12) / 100;
const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: number[], b: number[], p: number) => a.map((v, i) => Math.round(v * p + b[i]! * (1 - p)));
const lum = (c: number[]) => c.map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i]!, 0);
const ratio = (a: number[], b: number[]) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x! + 0.05) / (y! + 0.05); };

const TONES = ["accent", "danger", "warn", "ok", "violet", "pink", "gold"];

describe.each([["светлая", LIGHT], ["тёмная", DARK]])("контраст цветного текста, тема %s", (_, theme) => {
  const get = (name: string) => rgb(hex(theme, name) ?? hex(LIGHT, name)!);
  it.each(TONES)("%s читается на карточке, фоне, приглушённой и своей мягкой подложке", (tone) => {
    const fg = get(tone), panel = get("panel");
    const grounds = { panel, bg: get("bg"), "surface-2": get("surface-2"), soft: mix(fg, panel, theme.includes(`--vs-${soft(tone)}`) ? share(theme, tone) : share(LIGHT, tone)), ...(tone === "accent" ? { "tint-on-bg": mix(fg, get("bg"), share(LIGHT, tone)), "tint-on-surface-2": mix(fg, get("surface-2"), share(LIGHT, tone)) } : {}) };
    const low = Object.entries(grounds).map(([name, ground]) => `${name} ${ratio(fg, ground).toFixed(2)}`).filter((x) => Number(x.split(" ")[1]) < 4.5);
    expect(low).toEqual([]);
  });
});
