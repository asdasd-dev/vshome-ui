import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "../src";

describe("Switch", () => {
  it("role=switch, состояние и переключение", async () => {
    const onChange = vi.fn();
    render(<Switch checked={false} onChange={onChange} label="Делает агент" icon="🤖" />);
    const s = screen.getByRole("switch", { name: "Делает агент" });
    expect(s).not.toBeChecked();
    await userEvent.click(s);
    expect(onChange).toHaveBeenCalledWith(true);
  });
  it("клик, клавиши, pointerdown, mousedown и touchstart не всплывают к плитке", async () => {
    const onTile = vi.fn();
    render(
      <div onClick={onTile} onKeyDown={onTile} onPointerDown={onTile} onMouseDown={onTile} onTouchStart={onTile}>
        <Switch checked onChange={() => {}} label="Делает агент" />
      </div>,
    );
    const s = screen.getByRole("switch");
    await userEvent.click(s);
    fireEvent.keyDown(s, { key: "Enter" });
    fireEvent.pointerDown(s);
    fireEvent.mouseDown(s);
    fireEvent.touchStart(s);
    expect(onTile).not.toHaveBeenCalled();
  });
  it("размер sm — модификатор класса, title пробрасывается", () => {
    const { container } = render(<Switch checked onChange={() => {}} label="x" size="sm" title="агент возьмёт в Doing" />);
    expect(container.firstChild).toHaveClass("vs-switch", "vs-switch--sm");
    expect(container.firstChild).toHaveAttribute("title", "агент возьмёт в Doing");
  });
});
