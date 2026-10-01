import { act, render, screen } from "@testing-library/react";
import { ToastProvider, useToast, Sheet } from "../src";

function Trigger({ text }: { text: string }) {
  const toast = useToast();
  return <button onClick={() => toast(text)}>go</button>;
}

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("Toast", () => {
  it("показывает текст и прячет через duration; новый тост продлевает показ", () => {
    render(<ToastProvider duration={1000}><Trigger text="Сохранено" /></ToastProvider>);
    act(() => screen.getByText("go").click());
    expect(screen.getByRole("status")).toHaveTextContent("Сохранено");
    act(() => vi.advanceTimersByTime(800));
    act(() => screen.getByText("go").click());
    act(() => vi.advanceTimersByTime(800));
    expect(screen.getByRole("status")).toHaveTextContent("Сохранено");
    act(() => vi.advanceTimersByTime(300));
    expect(screen.queryByRole("status")).toBeNull();
  });
  it("при открытом листе тост в body, вне листа (лист — портал Base UI, top layer нет)", () => {
    render(
      <ToastProvider>
        <Sheet open onRequestClose={() => {}} head="T-1"><Trigger text="Ссылка добавлена" /></Sheet>
      </ToastProvider>,
    );
    act(() => screen.getByText("go").click());
    const toast = screen.getByRole("status");
    expect(toast.parentElement).toBe(document.body);
    expect(toast).toHaveClass("vs-toast");
    expect(document.querySelector(".vs-sheet")).not.toContainElement(toast);
  });
  it("useToast вне провайдера — понятная ошибка", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Trigger text="x" />)).toThrow("useToast вне ToastProvider");
  });
});
