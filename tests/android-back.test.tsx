import { act, renderHook } from "@testing-library/react";
import { useAndroidBack } from "../src/hooks/useAndroidBack";

class FakeWatcher {
  static all: FakeWatcher[] = [];
  onclose: (() => void) | null = null;
  destroyed = false;
  constructor() { FakeWatcher.all.push(this); }
  destroy() { this.destroyed = true; }
}
const back = () => act(() => { const w = FakeWatcher.all.filter((x) => !x.destroyed).at(-1)!; w.destroyed = true; w.onclose?.(); });

beforeEach(() => {
  FakeWatcher.all = [];
  vi.stubGlobal("CloseWatcher", FakeWatcher);
  vi.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (Linux; Android 14) Chrome/130");
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("useAndroidBack", () => {
  it("отказ закрыть — наблюдатель создаётся заново, второе «Назад» снова спрашивает", () => {
    const onBack = vi.fn(() => false);
    renderHook(() => useAndroidBack(true, onBack));
    back();
    back();
    expect(onBack).toHaveBeenCalledTimes(2);
    expect(FakeWatcher.all.filter((w) => !w.destroyed)).toHaveLength(1);
  });
  it("закрыт — наблюдатель уничтожен; не Android — наблюдателя нет", () => {
    const { rerender } = renderHook(({ open }) => useAndroidBack(open, () => true), { initialProps: { open: true } });
    rerender({ open: false });
    expect(FakeWatcher.all.every((w) => w.destroyed)).toBe(true);
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (Macintosh) Chrome/130");
    FakeWatcher.all = [];
    renderHook(() => useAndroidBack(true, () => true));
    expect(FakeWatcher.all).toHaveLength(0);
  });
});
