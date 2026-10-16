import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChipGroup, IconButton, Select, Snippet } from "../src";
import { allCss } from "./css";

describe("правки 0.30", () => {
  it("Snippet: действия в одну строку внизу, карточка на высоту ряда", () => {
    const css = allCss();
    expect(css).toMatch(/\.vs-snippet__actions \{[^}]*flex-wrap: nowrap/);
    expect(css).toMatch(/\.vs-snippet \{[^}]*height: 100%/);
    expect(css).not.toMatch(/\.vs-snippet \{[^}]*align-self: start/);
    expect(css).toMatch(/\.vs-snippet__actions \{ margin-top: auto/);
    render(<Snippet title="Котлеты" actions={<IconButton icon="eye-off" size="sm" label="Не показывать" />} />);
    expect(screen.getByRole("button", { name: "Не показывать" })).toBeInTheDocument();
  });
  it("ChipGroup scroll: затухание у края, за которым есть чипы", () => {
    const { container } = render(<ChipGroup label="Категория" scroll value="a" onChange={() => undefined} options={[{ value: "a", label: "Все" }, { value: "b", label: "Мясо" }]} />);
    const el = container.firstElementChild as HTMLDivElement;
    Object.defineProperty(el, "scrollWidth", { configurable: true, value: 500 });
    Object.defineProperty(el, "clientWidth", { configurable: true, value: 200 });
    act(() => { el.dispatchEvent(new Event("scroll")); });
    expect(el.className).toContain("vs-chip-group--fade-end");
    expect(el.className).not.toContain("vs-chip-group--fade-start");
    el.scrollLeft = 300;
    act(() => { el.dispatchEvent(new Event("scroll")); });
    expect(el.className).toContain("vs-chip-group--fade-start");
    expect(el.className).not.toContain("vs-chip-group--fade-end");
  });
  it("Select size=sm", () => {
    const { container } = render(<Select size="sm" label="Сортировка" value="a" onChange={() => undefined} options={[{ value: "a", label: "Скидка" }]} />);
    expect(container.querySelector(".vs-select")!.className).toContain("vs-select--sm");
  });
});
