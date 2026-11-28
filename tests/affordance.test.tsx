import { render } from "@testing-library/react";
import { allCss } from "./css";
import { Link, List, ListRow } from "../src";

const rules = (css: string) => [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}@]+)\{([^{}]*)\}/g)].map((m) => ({ sel: m[1]!.trim(), body: m[2]! }));
const PRESSABLE = /\.vs-(button|icon-button|split)(--[\w-]+)?(?=[\s.:\[,]|$)/;

describe("нажимаемое видно в покое, без наведения", () => {
  it("у кнопок нет прозрачной подложки ни в одном варианте", () => {
    const bad = rules(allCss()).filter((r) => PRESSABLE.test(r.sel) && !/\s+button\b/.test(r.sel)
      && /(^|;)\s*(background|--vs-button-bg)\s*:\s*(transparent|none)\s*(;|$)/.test(r.body));
    expect(bad.map((r) => r.sel)).toEqual([]);
  });

  it("на плитке с обложкой подложка ghost-кнопок плотнее, чтобы читалась поверх картинки", () => {
    expect(rules(allCss()).find((r) => r.sel === ".vs-tile--backdrop" && r.body.includes("--vs-ghost-bg"))!.body).toMatch(/--vs-ghost-bg: color-mix\(in srgb, var\(--vs-surface-1\) \d+%, transparent\)/);
  });

  it("переключатель soft — дорожка на поверхности кнопок, выбранный — как нажатая кнопка", () => {
    const soft = rules(allCss()).filter((r) => r.sel.startsWith(".vs-segment--soft"));
    expect(soft.find((r) => r.sel === ".vs-segment--soft")!.body).toContain("var(--vs-surface-2)");
    expect(soft.find((r) => r.sel.includes("[aria-pressed=\"true\"]"))!.body).toContain("var(--vs-accent-soft)");
  });

  it("строка списка, которая открывается, — с шевроном; обычная — без", () => {
    const { container } = render(<List><ListRow title="Окулист" onClick={() => {}} /><ListRow title="Lenta" href="#/x" /><ListRow title="Daily" /></List>);
    const rows = [...container.querySelectorAll(".vs-list-row")];
    expect(rows.map((r) => !!r.querySelector(".vs-list-row__go"))).toEqual([true, true, false]);
  });

  it("строка выбора без шеврона: тап выбирает, а не открывает подробности", () => {
    const { container } = render(<List><ListRow title="Молочное" onClick={() => {}} chevron={false} /></List>);
    expect(container.querySelector(".vs-list-row__go")).toBeNull();
    expect(container.querySelector("button.vs-list-row__inner")).not.toBeNull();
  });

  it("нейтральная метка на приглушённой карточке получает светлую подложку, а не цвет самой карточки", () => {
    const sheet = rules(allCss());
    expect(sheet.find((r) => r.sel === ".vs-card--muted")!.body).toMatch(/--vs-chip-neutral: var\(--vs-panel\)/);
    expect(sheet.find((r) => r.sel === ".vs-tag")!.body).toMatch(/--vs-tag-soft: var\(--vs-chip-neutral, var\(--vs-surface-2\)\)/);
    expect(sheet.find((r) => r.sel === ".vs-badge--muted")!.body).toMatch(/--vs-badge-bg: var\(--vs-chip-neutral, var\(--vs-surface-2\)\)/);
  });

  it("на сенсорном экране маленький чип и ссылка дают зону нажатия не меньше 32 px, не сдвигая текст", () => {
    const css = allCss();
    expect(css).toMatch(/@media \(pointer: coarse\) \{ \.vs-chip--sm \{ min-height: calc\(32px/);
    expect(css).toMatch(/@media \(pointer: coarse\) \{ \.vs-link \{ padding-block: var\(--vs-space-1_5\); margin-block: calc\(-1 \* var\(--vs-space-1_5\)\); \} \}/);
  });

  it("заголовок строки можно показать в три строки", () => {
    const { container } = render(<List><ListRow title="Чай черный DOLCE ALBERO с бергамотом" titleLines={3} sub="Лента" /></List>);
    expect(container.querySelector(".vs-list-row__name--3")).not.toBeNull();
    expect(rules(allCss()).find((r) => r.sel === ".vs-list-row__name--3, .vs-list-row__title--3")!.body).toMatch(/-webkit-line-clamp: 3/);
  });

  it("ссылка на касании подчёркнута, приглушённая — всегда", () => {
    const css = allCss();
    expect(css).toMatch(/@media \(hover: none\) \{ \.vs-link \{[^}]*text-decoration: underline/);
    expect(rules(css).find((r) => r.sel === ".vs-link--muted")!.body).toMatch(/text-decoration: underline/);
  });

  it("ссылка-блок без подчёркивания в покое, подчёркивается только при наведении", () => {
    const { container } = render(<Link href="#/x" block tone="muted"><span>Заголовок</span><span>Подпись</span></Link>);
    expect(container.querySelector("a")!.className).toContain("vs-link--block");
    const css = allCss();
    const at = (sel: string) => css.indexOf(sel);
    expect(rules(css).find((r) => r.sel === ".vs-link.vs-link--block")!.body).toMatch(/text-decoration: none/);
    expect(at(".vs-link.vs-link--block")).toBeGreaterThan(at("@media (hover: none) { .vs-link {"));
    expect(at(".vs-link.vs-link--block")).toBeLessThan(at(".vs-link--underline-hover:hover"));
  });
});
