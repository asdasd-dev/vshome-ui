import { fireEvent, render, screen } from "@testing-library/react";
import { RangeSlider, Seek, Slider } from "../src";

const RECT = { left: 0, right: 200, top: 0, bottom: 40, width: 200, height: 40, x: 0, y: 0, toJSON: () => ({}) };
const at = (el: Element, rect = RECT) => { (el as HTMLElement).getBoundingClientRect = () => rect as DOMRect; return el as HTMLElement; };
const touch = (x: number, y: number) => ({ pointerId: 1, pointerType: "touch", clientX: x, clientY: y, button: 0 });
const trackOf = (name: string) => at(screen.getByRole("slider", { name }).closest("label")!);

describe("ползунки на касании", () => {
  it("Slider: вертикальный свайп с ползунка — прокрутка, значение не меняется", () => {
    const onCommit = vi.fn();
    render(<Slider label="Люстра: яркость" value={34} onCommit={onCommit} format={(v) => `${v}%`} />);
    const track = trackOf("Люстра: яркость");
    fireEvent.pointerDown(track, touch(150, 20));
    fireEvent.pointerMove(track, touch(151, 40));
    fireEvent.pointerCancel(track, touch(151, 60));
    expect(screen.getByText("34%")).toBeTruthy();
    expect(onCommit).not.toHaveBeenCalled();
  });

  it("Slider: вертикальный свайп без pointercancel тоже не трогает значение", () => {
    const onCommit = vi.fn();
    render(<Slider label="Люстра: яркость" value={34} onCommit={onCommit} format={(v) => `${v}%`} />);
    const track = trackOf("Люстра: яркость");
    fireEvent.pointerDown(track, touch(150, 20));
    fireEvent.pointerMove(track, touch(150, 45));
    fireEvent.pointerMove(track, touch(30, 50));
    fireEvent.pointerUp(track, touch(30, 50));
    expect(screen.getByText("34%")).toBeTruthy();
    expect(onCommit).not.toHaveBeenCalled();
  });

  it("Slider: горизонтальное движение тянет, отпускание коммитит", () => {
    const onCommit = vi.fn();
    render(<Slider label="Люстра: яркость" min={0} value={34} onCommit={onCommit} format={(v) => `${v}%`} />);
    const track = trackOf("Люстра: яркость");
    fireEvent.pointerDown(track, touch(68, 20));
    fireEvent.pointerMove(track, touch(100, 22));
    expect(screen.getByText("50%")).toBeTruthy();
    fireEvent.pointerMove(track, touch(160, 22));
    fireEvent.pointerUp(track, touch(160, 22));
    expect(onCommit).toHaveBeenCalledOnce();
    expect(onCommit).toHaveBeenCalledWith(80);
  });

  it("Slider: тап без движения ставит значение под пальцем", () => {
    const onCommit = vi.fn();
    render(<Slider label="Люстра: яркость" min={0} value={34} onCommit={onCommit} />);
    const track = trackOf("Люстра: яркость");
    fireEvent.pointerDown(track, touch(50, 20));
    fireEvent.pointerUp(track, touch(50, 21));
    expect(onCommit).toHaveBeenCalledWith(25);
  });

  it("Slider: мышь — значение сразу по нажатию", () => {
    const onCommit = vi.fn();
    render(<Slider label="Люстра: яркость" min={0} value={34} onCommit={onCommit} />);
    const track = trackOf("Люстра: яркость");
    fireEvent.pointerDown(track, { pointerId: 2, pointerType: "mouse", clientX: 100, clientY: 20, button: 0 });
    fireEvent.pointerUp(track, { pointerId: 2, pointerType: "mouse", clientX: 100, clientY: 20, button: 0 });
    expect(onCommit).toHaveBeenCalledWith(50);
  });

  it("Slider: вертикальный line-ползунок тянется вертикально, горизонтальный свайп его не трогает", () => {
    const onCommit = vi.fn();
    render(<Slider label="Громкость" variant="line" orientation="vertical" min={0} value={20} onCommit={onCommit} />);
    const tall = { left: 0, right: 40, top: 0, bottom: 200, width: 40, height: 200, x: 0, y: 0, toJSON: () => ({}) };
    const track = at(screen.getByRole("slider", { name: "Громкость" }).closest("label")!, tall);
    fireEvent.pointerDown(track, touch(20, 160));
    fireEvent.pointerMove(track, touch(45, 161));
    fireEvent.pointerUp(track, touch(45, 161));
    expect(onCommit).not.toHaveBeenCalled();
    fireEvent.pointerDown(track, touch(20, 160));
    fireEvent.pointerMove(track, touch(20, 100));
    fireEvent.pointerUp(track, touch(20, 100));
    expect(onCommit).toHaveBeenCalledWith(50);
  });

  it("Seek: прокрутка с полосы не перематывает", () => {
    const onCommit = vi.fn();
    render(<Seek label="Перемотка трека" value={10} max={100} onCommit={onCommit} />);
    const track = trackOf("Перемотка трека");
    fireEvent.pointerDown(track, touch(150, 20));
    fireEvent.pointerMove(track, touch(150, 60));
    fireEvent.pointerUp(track, touch(150, 60));
    expect(onCommit).not.toHaveBeenCalled();
    fireEvent.pointerDown(track, touch(100, 20));
    fireEvent.pointerUp(track, touch(100, 20));
    expect(onCommit).toHaveBeenCalledWith(50);
  });

  it("RangeSlider: тянется ближний бегунок, прокрутка ничего не трогает", () => {
    const onCommit = vi.fn();
    const { container } = render(<RangeSlider label="Скидка" value={[20, 80]} onCommit={onCommit} />);
    const box = at(container.querySelector(".vs-range")!);
    fireEvent.pointerDown(box, touch(150, 20));
    fireEvent.pointerMove(box, touch(150, 60));
    fireEvent.pointerUp(box, touch(150, 60));
    expect(onCommit).not.toHaveBeenCalled();
    fireEvent.pointerDown(box, touch(150, 20));
    fireEvent.pointerMove(box, touch(180, 20));
    fireEvent.pointerUp(box, touch(180, 20));
    expect(onCommit).toHaveBeenCalledWith(20, 90);
    fireEvent.pointerDown(box, touch(60, 20));
    fireEvent.pointerUp(box, touch(60, 20));
    expect(onCommit).toHaveBeenLastCalledWith(30, 90);
  });

  it("нативный range сам касание не ловит: жест только у дорожки", async () => {
    const { allCss } = await import("./css");
    const css = allCss();
    for (const sel of [".vs-slider input", ".vs-range-line input", ".vs-range__input::-webkit-slider-thumb"]) {
      expect(css).toMatch(new RegExp(`${sel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\{[^}]*pointer-events: none`));
    }
    for (const sel of [".vs-slider", ".vs-range-line", ".vs-range"]) {
      expect(css).toMatch(new RegExp(`${sel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")} \\{[^}]*touch-action: pan-y`));
    }
  });
});
