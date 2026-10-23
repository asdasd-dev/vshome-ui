import { render } from "@testing-library/react";
import { allCss } from "./css";
import { List, ListRow } from "../src";

const rules = (css: string) => [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}@]+)\{([^{}]*)\}/g)].map((m) => ({ sel: m[1]!.trim(), body: m[2]! }));
const PRESSABLE = /\.vs-(button|icon-button|split)(--[\w-]+)?(?=[\s.:\[,]|$)/;

describe("нажимаемое видно в покое, без наведения", () => {
  it("у кнопок нет прозрачной подложки ни в одном варианте", () => {
    const bad = rules(allCss()).filter((r) => PRESSABLE.test(r.sel) && !/\s+button\b/.test(r.sel)
      && /(^|;)\s*(background|--vs-button-bg)\s*:\s*(transparent|none)\s*(;|$)/.test(r.body));
    expect(bad.map((r) => r.sel)).toEqual([]);
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

  it("ссылка на касании подчёркнута, приглушённая — всегда", () => {
    const css = allCss();
    expect(css).toMatch(/@media \(hover: none\) \{ \.vs-link \{[^}]*text-decoration: underline/);
    expect(rules(css).find((r) => r.sel === ".vs-link--muted")!.body).toMatch(/text-decoration: underline/);
  });
});
