import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Sheet } from "../src";

function Harness({ allowClose = true, scrollKey, onRequest = () => {} }: { allowClose?: boolean; scrollKey?: unknown; onRequest?: () => void }) {
  const [open, setOpen] = useState(true);
  return (
    <Sheet open={open} onRequestClose={() => { onRequest(); if (allowClose) setOpen(false); return allowClose; }} head="T-1 · Review" footer={<button>Апрув</button>} scrollKey={scrollKey}>
      <p>Тело</p>
    </Sheet>
  );
}

const dialog = () => document.querySelector("dialog")!;

describe("Sheet", () => {
  it("открывается модально и показывает шапку, тело и подвал", () => {
    render(<Harness />);
    expect(dialog().open).toBe(true);
    expect(screen.getByText("T-1 · Review")).toBeInTheDocument();
    expect(screen.getByText("Тело")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Апрув" })).toBeInTheDocument();
  });
  it("✕ закрывает через onRequestClose", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "Закрыть" }));
    expect(dialog().open).toBe(false);
  });
  it("Esc: onRequestClose вернул false — лист остаётся, событие cancel отменено", () => {
    render(<Harness allowClose={false} />);
    const ev = new Event("cancel", { cancelable: true });
    fireEvent(dialog(), ev);
    expect(ev.defaultPrevented).toBe(true);
    expect(dialog().open).toBe(true);
  });
  it("диалог назван заголовком", () => {
    render(<Harness />);
    expect(screen.getByRole("dialog", { name: "T-1 · Review" })).toBe(dialog());
  });
  it("неотменяемый cancel (повторный Esc/Back) и нативное закрытие: onRequestClose вернул false — лист снова открыт", () => {
    const onRequest = vi.fn();
    render(<Harness allowClose={false} onRequest={onRequest} />);
    const ev = new Event("cancel", { cancelable: false });
    fireEvent(dialog(), ev);
    act(() => dialog().close());
    expect(onRequest).toHaveBeenCalledTimes(1);
    expect(dialog().open).toBe(true);
  });
  it("неотменяемый cancel и нативное закрытие: onRequestClose закрыл — лист закрыт, вызов один", () => {
    const onRequest = vi.fn();
    render(<Harness onRequest={onRequest} />);
    fireEvent(dialog(), new Event("cancel", { cancelable: false }));
    act(() => dialog().close());
    expect(onRequest).toHaveBeenCalledTimes(1);
    expect(dialog().open).toBe(false);
  });
  it("закрытие через проп open не зовёт onRequestClose", () => {
    const onRequest = vi.fn();
    const { rerender } = render(<Sheet open onRequestClose={onRequest} head="x"><p>a</p></Sheet>);
    rerender(<Sheet open={false} onRequestClose={onRequest} head="x"><p>a</p></Sheet>);
    expect(dialog().open).toBe(false);
    expect(onRequest).not.toHaveBeenCalled();
    rerender(<Sheet open onRequestClose={onRequest} head="x"><p>a</p></Sheet>);
    expect(dialog().open).toBe(true);
  });
  it("без footer подвала нет", () => {
    render(<Sheet open onRequestClose={() => {}} head="x"><p>a</p></Sheet>);
    expect(document.querySelector(".vs-sheet__foot")).toBeNull();
  });
  it("смена scrollKey прокручивает тело наверх", () => {
    const { rerender } = render(<Harness scrollKey="view" />);
    const body = document.querySelector(".vs-sheet__body")!;
    Object.defineProperty(body, "scrollTop", { value: 120, writable: true, configurable: true });
    expect(body.scrollTop).toBe(120);
    rerender(<Harness scrollKey="edit" />);
    expect(body.scrollTop).toBe(0);
  });
});
