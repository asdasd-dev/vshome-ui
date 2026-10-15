import fs from "node:fs";
import path from "node:path";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Artwork, Button, Clock, Cluster, Excerpt, List, ListRow, Stack, Tile } from "../src";

const css = (f: string) => fs.readFileSync(path.join(__dirname, "..", "src", "components", f), "utf8");

describe("Cluster и Stack", () => {
  it("ряд: отступ из шкалы, выравнивание, перенос и жёсткие дети — классами", () => {
    const { container } = render(<Cluster gap="4" align="baseline" justify="between" wrap rigid as="header"><span>a</span></Cluster>);
    const el = container.firstElementChild!;
    expect(el.tagName).toBe("HEADER");
    for (const c of ["vs-cluster", "vs-cluster--gap-4", "vs-cluster--align-baseline", "vs-cluster--justify-between", "vs-cluster--wrap", "vs-cluster--rigid"]) expect(el.classList.contains(c), c).toBe(true);
  });
  it("по умолчанию: gap 2, по центру, без переноса", () => {
    const { container } = render(<Cluster><span>a</span></Cluster>);
    expect(container.firstElementChild!.className).toBe("vs-cluster vs-cluster--gap-2 vs-cluster--align-center");
  });
  it("колонка с отступом", () => {
    const { container } = render(<Stack gap="1"><span>a</span></Stack>);
    expect(container.firstElementChild!.className).toBe("vs-stack vs-stack--gap-1");
  });
  it("отступы только из токенов шкалы", () => {
    for (const g of ["1", "2", "3", "4", "6"]) expect(css("Layout.css")).toContain(`.vs-cluster--gap-${g}, .vs-stack--gap-${g} { gap: var(--vs-space-${g}); }`);
  });
});

describe("Clock", () => {
  it("цифры дисплейным шрифтом, размер и вес классами", () => {
    render(<Clock size="hero" weight="medium" align="center">19:56</Clock>);
    const c = screen.getByText("19:56");
    for (const k of ["vs-clock", "vs-clock--hero", "vs-clock--w-medium", "vs-clock--center"]) expect(c.classList.contains(k), k).toBe(true);
    expect(css("Clock.css")).toMatch(/\.vs-clock \{[^}]*font-family: var\(--vs-font-display\)[^}]*font-variant-numeric: tabular-nums/);
  });
});

describe("Artwork", () => {
  it("квадратная обложка со скруглением", () => {
    render(<Artwork src="data:," alt="обложка" size="lg" />);
    const img = screen.getByRole("img", { name: "обложка" });
    expect(img.className).toBe("vs-artwork vs-artwork--lg");
    expect(css("Artwork.css")).toMatch(/\.vs-artwork \{[^}]*aspect-ratio: 1[^}]*border-radius: var\(--vs-radius-md\)[^}]*object-fit: cover/);
  });
});

describe("Excerpt", () => {
  it("не влезает — кнопка с затуханием, касание открывает шторку с заголовком и полным текстом; в киоске шторка киосковая", () => {
    const h = vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockImplementation(function (this: HTMLElement) { return this.classList.contains("vs-excerpt") ? 500 : 0; });
    render(<div className="vs-kiosk"><Excerpt title="Синк">длинное описание</Excerpt></div>);
    const ex = screen.getByRole("button", { name: "длинное описание" });
    expect(ex).toHaveAttribute("data-more");
    fireEvent.click(ex);
    const dlg = screen.getByRole("dialog");
    expect(within(dlg).getByText("Синк")).toBeTruthy();
    expect(within(dlg).getAllByText("длинное описание").length).toBeGreaterThan(0);
    expect(dlg.closest(".vs-kiosk") ?? dlg.querySelector(".vs-kiosk") ?? (dlg.classList.contains("vs-kiosk") ? dlg : null)).not.toBeNull();
    h.mockRestore();
  });
  it("влезает — просто текст", () => {
    render(<Excerpt title="Синк">коротко</Excerpt>);
    expect(screen.getByText("коротко")).not.toHaveAttribute("data-more");
    expect(screen.queryByRole("button")).toBeNull();
  });
});

describe("List label", () => {
  it("подпись группы над строками; пустой список — без подписи", () => {
    const { container, rerender } = render(<List label="Тебе пишут"><ListRow title="a" /></List>);
    expect(container.querySelector(".vs-list__label")!.textContent).toBe("Тебе пишут");
    rerender(<List label="Тебе пишут">{[]}</List>);
    expect(container.querySelector(".vs-list__label")).toBeNull();
  });
});

describe("Tile", () => {
  it("dimmed — приглушённая плитка; шапка выравнивает по центру", () => {
    render(<Tile label="Музыка" dimmed>x</Tile>);
    expect(screen.getByRole("region", { name: "Музыка" }).className).toContain("vs-tile--dimmed");
    expect(css("Panel.css")).toMatch(/\.vs-tile__head \{[^}]*align-items: center/);
    expect(css("Panel.css")).toMatch(/\.vs-tile--dimmed \{[^}]*opacity/);
  });
});

describe("Button warn", () => {
  it("мягкий фон и текст цвета предупреждения", () => {
    render(<Button variant="warn" size="sm" icon="dot">2 в MM</Button>);
    expect(screen.getByRole("button", { name: "2 в MM" }).className).toContain("vs-button--warn");
    expect(css("Button.css")).toMatch(/\.vs-button--warn \{[^}]*--vs-button-bg: var\(--vs-warn-soft\)[^}]*--vs-button-fg: var\(--vs-warn\)/);
  });
});
