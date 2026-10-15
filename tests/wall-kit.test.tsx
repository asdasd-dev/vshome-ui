import fs from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { allCss } from "./css";
import { describe, expect, it } from "vitest";
import { Banner, Clock, ControlList, ControlRow, Divider, Text } from "../src";

const css = (f: string) => fs.readFileSync(path.join(__dirname, "..", "src", f), "utf8");

describe("Clock soft", () => {
  it("приглушённые часы", () => {
    render(<Clock size="hero" tone="soft">10:00</Clock>);
    expect(screen.getByText("10:00").classList.contains("vs-clock--soft")).toBe(true);
    expect(css("components/Clock.css")).toMatch(/\.vs-clock--soft \{[^}]*color: color-mix\(in srgb, var\(--vs-ink\) 80%, transparent\)/);
  });
});

describe("Text headline", () => {
  it("крупная строка xl", () => {
    render(<Text variant="headline">чт, 15 октября</Text>);
    expect(screen.getByText("чт, 15 октября").className).toContain("vs-text--headline");
    expect(css("components/Text.css")).toMatch(/\.vs-text--headline \{[^}]*font-size: var\(--vs-text-xl\)[^}]*line-height: var\(--vs-leading-xl\)/);
  });
});

describe("Divider", () => {
  it("вертикальный и горизонтальный разделитель", () => {
    const { container } = render(<><Divider vertical /><Divider /></>);
    const [v, h] = [...container.querySelectorAll("[role=separator]")];
    expect(v!.getAttribute("aria-orientation")).toBe("vertical");
    expect(v!.className).toBe("vs-divider vs-divider--vertical");
    expect(h!.className).toBe("vs-divider");
    expect(css("components/Layout.css")).toMatch(/\.vs-divider--vertical \{[^}]*align-self: stretch[^}]*border-left: thin solid var\(--vs-line\)/);
  });
});

describe("ControlList", () => {
  it("строка: подпись, управление справа, дополнительное — на всю ширину под ними", () => {
    const { container } = render(<ControlList><ControlRow label={<span>Люстра</span>} control={<button type="button">вкл</button>}><input aria-label="яркость" /></ControlRow></ControlList>);
    const row = container.querySelector("li.vs-control-row")!;
    expect(row.querySelector(".vs-control-row__label")!.textContent).toBe("Люстра");
    expect(row.querySelector(".vs-control-row__control")!.textContent).toBe("вкл");
    expect(row.querySelector(".vs-control-row__extra input")).not.toBeNull();
    expect(container.querySelector("ul.vs-control-list")).not.toBeNull();
  });
});

describe("Banner truncate", () => {
  it("в одну строку с многоточием", () => {
    render(<Banner truncate>очень длинная причина</Banner>);
    const b = screen.getByRole("status");
    expect(b.className).toContain("vs-banner--truncate");
    expect(b.querySelector(".vs-banner__text")!.textContent).toBe("очень длинная причина");
    expect(allCss()).toMatch(/\.vs-banner--truncate \.vs-banner__text \{[^}]*text-overflow: ellipsis/);
  });
});

describe("основа", () => {
  it("Stat не сжимается в ряду; кнопки не выделяются и без задержки касания", () => {
    expect(allCss()).toMatch(/\.vs-stat \{[^}]*flex: none/);
    expect(css("styles/base.css")).toMatch(/button \{[^}]*touch-action: manipulation[^}]*user-select: none/);
  });
});
