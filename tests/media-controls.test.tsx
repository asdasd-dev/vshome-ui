import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { allCss } from "./css";
import { Seek, Slider, Tile } from "../src";

describe("Seek", () => {
  it("полоса перемотки: время слева и длительность справа, onCommit в секундах при отпускании", () => {
    const onCommit = vi.fn();
    render(<Seek label="Перемотка трека" value={86} max={263} onCommit={onCommit} />);
    const r = screen.getByRole("slider", { name: "Перемотка трека" });
    expect(r).toHaveAttribute("min", "0");
    expect(r).toHaveAttribute("max", "263");
    expect(r).toHaveAttribute("aria-valuetext", "1:26 из 4:23");
    expect(screen.getByText("1:26")).toBeTruthy();
    expect(screen.getByText("4:23")).toBeTruthy();
    fireEvent.pointerDown(r);
    fireEvent.change(r, { target: { value: "200" } });
    expect(screen.getByText("3:20")).toBeTruthy();
    expect(onCommit).not.toHaveBeenCalled();
    fireEvent.pointerUp(r);
    expect(onCommit).toHaveBeenCalledWith(200);
  });
  it("пока палец на полосе, новое value сверху не сбивает положение", () => {
    const { rerender } = render(<Seek label="x" value={10} max={100} onCommit={() => undefined} />);
    const r = screen.getByRole("slider");
    fireEvent.pointerDown(r);
    fireEvent.change(r, { target: { value: "50" } });
    rerender(<Seek label="x" value={11} max={100} onCommit={() => undefined} />);
    expect(screen.getByText("0:50")).toBeTruthy();
  });
  it("час и больше — с часами", () => {
    render(<Seek label="x" value={3725} max={7200} onCommit={() => undefined} />);
    expect(screen.getByText("1:02:05")).toBeTruthy();
    expect(screen.getByText("2:00:00")).toBeTruthy();
  });
  it("заливка и ручка на токенах, полоса тянется", () => {
    expect(allCss()).toMatch(/\.vs-seek \{[^}]*grid-template-columns: auto minmax\(0, 1fr\) auto[^}]*font-variant-numeric: tabular-nums/);
    expect(allCss()).toMatch(/\.vs-seek__track::before \{[^}]*var\(--vs-seek-fill\)/);
  });
});

describe("Slider icon", () => {
  it("иконка слева внутри полосы, декоративная", () => {
    const { container } = render(<Slider label="Громкость" value={60} min={0} onCommit={() => undefined} icon="volume" />);
    const icon = container.querySelector(".vs-slider__icon")!;
    expect(icon.getAttribute("data-icon")).toBe("volume");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});

describe("Tile backdrop", () => {
  it("картинка фоном под затемнением, декоративная, содержимое поверх", () => {
    const { container } = render(<Tile label="Музыка" backdrop="https://i.scdn.co/image/x">трек</Tile>);
    const t = screen.getByRole("region", { name: "Музыка" });
    expect(t.className).toContain("vs-tile--backdrop");
    const bd = container.querySelector(".vs-tile__backdrop")!;
    expect(bd).toHaveAttribute("aria-hidden", "true");
    expect(bd.querySelector("img")!.getAttribute("src")).toBe("https://i.scdn.co/image/x");
    expect(t.firstElementChild).toBe(bd);
    expect(allCss()).toMatch(/\.vs-tile__backdrop::after \{[^}]*linear-gradient/);
  });
  it("без backdrop разметка прежняя", () => {
    const { container } = render(<Tile label="Музыка">x</Tile>);
    expect(container.querySelector(".vs-tile__backdrop")).toBeNull();
  });
});
