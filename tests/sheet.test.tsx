import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Sheet } from "../src";

function Harness({ allowClose = true, scrollKey }: { allowClose?: boolean; scrollKey?: unknown }) {
  const [open, setOpen] = useState(true);
  return (
    <Sheet open={open} onRequestClose={() => { if (allowClose) setOpen(false); return allowClose; }} head="T-1 · Review" footer={<button>Апрув</button>} scrollKey={scrollKey}>
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
