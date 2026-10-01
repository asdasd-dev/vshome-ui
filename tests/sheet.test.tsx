import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Sheet } from "../src";
import { sheetOpenChange } from "../src/components/Sheet";
import { setMobile } from "./media";

function Harness({ allowClose = true, scrollKey, onRequest = () => {} }: { allowClose?: boolean; scrollKey?: unknown; onRequest?: () => void }) {
  const [open, setOpen] = useState(true);
  const [draft, setDraft] = useState("");
  return (
    <Sheet open={open} onRequestClose={() => { onRequest(); if (allowClose) setOpen(false); return allowClose; }} head="T-1 · Review" footer={<button>Апрув</button>} scrollKey={scrollKey}>
      <p>Тело</p>
      <input aria-label="Черновик" value={draft} onChange={(e) => setDraft(e.target.value)} />
    </Sheet>
  );
}

const sheet = () => screen.queryByRole("dialog");

describe.each([["комп", false], ["телефон", true]])("Sheet (%s)", (_name, mobile) => {
  beforeEach(() => setMobile(mobile));

  it("открыт: шапка, тело и подвал; назван заголовком", () => {
    render(<Harness />);
    expect(screen.getByRole("dialog", { name: "T-1 · Review" })).toBeInTheDocument();
    expect(screen.getByText("Тело")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Апрув" })).toBeInTheDocument();
    expect(sheet()).toHaveClass("vs-sheet");
    expect(sheet()!.classList.contains("vs-sheet--drawer")).toBe(mobile);
  });
  it("✕ закрывает через onRequestClose", async () => {
    const onRequest = vi.fn();
    render(<Harness onRequest={onRequest} />);
    await userEvent.click(screen.getByRole("button", { name: "Закрыть" }));
    expect(onRequest).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(sheet()).toBeNull());
  });
  it("Esc: onRequestClose вернул false — лист остаётся", async () => {
    const onRequest = vi.fn();
    render(<Harness allowClose={false} onRequest={onRequest} />);
    await userEvent.keyboard("{Escape}");
    expect(onRequest).toHaveBeenCalledTimes(1);
    expect(sheet()).toBeInTheDocument();
  });
  it("закрытие через проп open не зовёт onRequestClose", async () => {
    const onRequest = vi.fn();
    const { rerender } = render(<Sheet open onRequestClose={onRequest} head="x"><p>a</p></Sheet>);
    rerender(<Sheet open={false} onRequestClose={onRequest} head="x"><p>a</p></Sheet>);
    await waitFor(() => expect(sheet()).toBeNull());
    expect(onRequest).not.toHaveBeenCalled();
    rerender(<Sheet open onRequestClose={onRequest} head="x"><p>a</p></Sheet>);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
  it("без footer подвала нет", () => {
    render(<Sheet open onRequestClose={() => {}} head="x"><p>a</p></Sheet>);
    expect(document.querySelector(".vs-sheet__foot")).toBeNull();
  });
  it("смена scrollKey прокручивает тело наверх", () => {
    const { rerender } = render(<Harness scrollKey="view" />);
    const body = document.querySelector(".vs-sheet__body")!;
    Object.defineProperty(body, "scrollTop", { value: 120, writable: true, configurable: true });
    rerender(<Harness scrollKey="edit" />);
    expect(body.scrollTop).toBe(0);
  });
  it("actions рядом с ✕", () => {
    render(<Sheet open onRequestClose={() => {}} head="x" actions={<button type="button">Изменить</button>}><p>a</p></Sheet>);
    expect(document.querySelector(".vs-sheet__actions")).toContainElement(screen.getByRole("button", { name: "Изменить" }));
  });
});

describe("Sheet: смена ширины при открытом листе", () => {
  it("комп → телефон: лист открыт, контролируемый ввод сайта на месте", async () => {
    setMobile(false);
    render(<Harness />);
    await userEvent.type(screen.getByRole("textbox", { name: "Черновик" }), "держу");
    act(() => setMobile(true));
    expect(await screen.findByRole("dialog", { name: "T-1 · Review" })).toHaveClass("vs-sheet--drawer");
    expect(screen.getByRole("textbox", { name: "Черновик" })).toHaveValue("держу");
  });
});

describe("sheetOpenChange", () => {
  it("отказ закрыть отменяет событие Base UI (Drawer по нему возвращается на место)", () => {
    const cancel = vi.fn();
    sheetOpenChange(() => false)(false, { cancel });
    expect(cancel).toHaveBeenCalledOnce();
  });
  it("согласие и открытие не отменяют", () => {
    const cancel = vi.fn();
    const onRequest = vi.fn(() => true);
    sheetOpenChange(onRequest)(false, { cancel });
    sheetOpenChange(onRequest)(true, { cancel });
    expect(onRequest).toHaveBeenCalledOnce();
    expect(cancel).not.toHaveBeenCalled();
  });
});

describe("Sheet: клик по фону", () => {
  it("отказ закрыть — лист остаётся", async () => {
    const onRequest = vi.fn();
    render(<Harness allowClose={false} onRequest={onRequest} />);
    const backdrop = document.querySelector(".vs-sheet-backdrop")!;
    fireEvent.pointerDown(backdrop);
    fireEvent.mouseDown(backdrop);
    fireEvent.click(backdrop);
    await waitFor(() => expect(onRequest).toHaveBeenCalled());
    expect(sheet()).toBeInTheDocument();
  });
});

describe("Sheet: «Назад» на Android", () => {
  class FakeWatcher {
    static all: FakeWatcher[] = [];
    onclose: (() => void) | null = null;
    destroyed = false;
    constructor() { FakeWatcher.all.push(this); }
    destroy() { this.destroyed = true; }
  }
  beforeEach(() => {
    FakeWatcher.all = [];
    setMobile(true);
    vi.stubGlobal("CloseWatcher", FakeWatcher);
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (Linux; Android 14) Chrome/130");
  });
  afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

  it("два запроса закрытия в одной задаче — onRequestClose один раз; в следующей задаче снова вызывается", async () => {
    const onRequest = vi.fn(() => false);
    render(<Harness allowClose={false} onRequest={onRequest} />);
    const watcher = FakeWatcher.all.find((w) => !w.destroyed)!;
    act(() => {
      watcher.onclose?.();
      fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    });
    expect(onRequest).toHaveBeenCalledTimes(1);
    await act(() => new Promise((r) => setTimeout(r, 0)));
    act(() => { FakeWatcher.all.filter((w) => !w.destroyed).at(-1)!.onclose?.(); });
    expect(onRequest).toHaveBeenCalledTimes(2);
  });
});
