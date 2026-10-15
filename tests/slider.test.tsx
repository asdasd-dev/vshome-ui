import { fireEvent, render, screen } from "@testing-library/react";
import { Slider } from "../src";

describe("Slider", () => {
  it("range с подписью и значением, onCommit при отпускании, не при движении", () => {
    const onCommit = vi.fn();
    render(<Slider label="Большая лента: яркость" value={70} onCommit={onCommit} format={(v) => `${v}%`} />);
    const r = screen.getByRole("slider", { name: "Большая лента: яркость" });
    expect(r).toHaveAttribute("min", "1");
    expect(r).toHaveAttribute("max", "100");
    expect(screen.getByText("70%")).toBeTruthy();
    fireEvent.change(r, { target: { value: "40" } });
    expect(screen.getByText("40%")).toBeTruthy();
    expect(onCommit).not.toHaveBeenCalled();
    fireEvent.pointerUp(r);
    expect(onCommit).toHaveBeenCalledWith(40);
  });
  it("клавиатура: keyUp коммитит", () => {
    const onCommit = vi.fn();
    render(<Slider label="x" value={10} onCommit={onCommit} />);
    const r = screen.getByRole("slider");
    fireEvent.change(r, { target: { value: "11" } });
    fireEvent.keyUp(r, { key: "ArrowRight" });
    expect(onCommit).toHaveBeenCalledWith(11);
  });
  it("без изменения отпускание не коммитит", () => {
    const onCommit = vi.fn();
    render(<Slider label="x" value={10} onCommit={onCommit} />);
    fireEvent.pointerUp(screen.getByRole("slider"));
    expect(onCommit).not.toHaveBeenCalled();
  });
  it("новое value снаружи — показывается", () => {
    const { rerender } = render(<Slider label="x" value={10} onCommit={() => {}} />);
    rerender(<Slider label="x" value={55} onCommit={() => {}} />);
    expect((screen.getByRole("slider") as HTMLInputElement).value).toBe("55");
  });
  it("тач: pointerup и touchend одного касания — один commit", () => {
    const onCommit = vi.fn();
    render(<Slider label="x" value={10} onCommit={onCommit} />);
    const r = screen.getByRole("slider");
    fireEvent.change(r, { target: { value: "30" } });
    fireEvent.pointerUp(r);
    fireEvent.touchEnd(r);
    expect(onCommit).toHaveBeenCalledTimes(1);
  });
  it("пока палец на ползунке, новое value снаружи не сбивает", () => {
    const { rerender } = render(<Slider label="x" value={10} onCommit={() => {}} />);
    const r = screen.getByRole("slider") as HTMLInputElement;
    fireEvent.pointerDown(r);
    fireEvent.change(r, { target: { value: "60" } });
    rerender(<Slider label="x" value={20} onCommit={() => {}} />);
    expect(r.value).toBe("60");
    fireEvent.pointerUp(r);
    rerender(<Slider label="x" value={25} onCommit={() => {}} />);
    expect(r.value).toBe("25");
  });
});
