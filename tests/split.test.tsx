import fs from "node:fs";
import path from "node:path";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { SplitButton } from "../src";

const more = (onClick = vi.fn()) => ({ label: "Кухня: лампы", onClick });

describe("SplitButton", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("две настоящие кнопки в одной капсуле, у каждой своя подпись", () => {
    const { container } = render(<SplitButton pressed more={more()} onClick={() => {}}>Кухня · 2</SplitButton>);
    const root = container.firstElementChild!;
    expect(root.className).toContain("vs-split");
    expect(root).toHaveAttribute("data-pressed");
    const [main, extra] = screen.getAllByRole("button");
    expect(main).toHaveAccessibleName("Кухня · 2");
    expect(main).toHaveAttribute("aria-pressed", "true");
    expect(extra).toHaveAccessibleName("Кухня: лампы");
    expect(extra).toHaveAttribute("aria-haspopup", "dialog");
    expect(extra!.querySelector("svg")).not.toBeNull();
  });
  it("без pressed — нет aria-pressed и data-pressed", () => {
    const { container } = render(<SplitButton more={more()} onClick={() => {}}>Кухня</SplitButton>);
    expect(container.firstElementChild).not.toHaveAttribute("data-pressed");
    expect(screen.getAllByRole("button")[0]).not.toHaveAttribute("aria-pressed");
  });
  it("нажатие на текст — onClick, на стрелку — more.onClick", () => {
    const onClick = vi.fn(), m = more();
    render(<SplitButton more={m} onClick={onClick}>Кухня</SplitButton>);
    const [main, extra] = screen.getAllByRole("button");
    fireEvent.click(main!);
    expect(onClick).toHaveBeenCalledTimes(1);
    fireEvent.click(extra!);
    expect(m.onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it("удержание текста — onHold, клик после удержания не срабатывает", () => {
    const onClick = vi.fn(), onHold = vi.fn();
    render(<SplitButton more={more()} onClick={onClick} onHold={onHold}>Кухня</SplitButton>);
    const main = screen.getAllByRole("button")[0]!;
    fireEvent.pointerDown(main);
    act(() => { vi.advanceTimersByTime(600); });
    fireEvent.pointerUp(main);
    fireEvent.click(main);
    expect(onHold).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(main);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it("короткое нажатие и pointercancel — удержания нет", () => {
    const onHold = vi.fn();
    render(<SplitButton more={more()} onClick={() => {}} onHold={onHold}>Кухня</SplitButton>);
    const main = screen.getAllByRole("button")[0]!;
    fireEvent.pointerDown(main);
    act(() => { vi.advanceTimersByTime(200); });
    fireEvent.pointerUp(main);
    fireEvent.pointerDown(main);
    fireEvent.pointerCancel(main);
    act(() => { vi.advanceTimersByTime(600); });
    expect(onHold).not.toHaveBeenCalled();
  });
  it("стили: капсула, черта внутри не до краёв, нажатая — акцентом", () => {
    const css = fs.readFileSync(path.join(__dirname, "..", "src", "components", "SplitButton.css"), "utf8");
    expect(css).toMatch(/\.vs-split \{[^}]*--vs-split-bg: var\(--vs-surface-2\)[^}]*border-radius: var\(--vs-radius-pill\)[^}]*background: var\(--vs-split-bg\)/);
    expect(css).toMatch(/\.vs-split__more::before \{[^}]*top: 25%[^}]*bottom: 25%/);
    expect(css).toMatch(/\.vs-split\[data-pressed\] \{[^}]*background: var\(--vs-split-pressed, var\(--vs-accent-soft\)\)/);
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b/i);
  });
});
