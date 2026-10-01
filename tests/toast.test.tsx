import { act, render, screen } from "@testing-library/react";
import { ToastProvider, useToast } from "../src";

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
  it("при открытом модальном dialog тост рендерится внутрь него (иначе он под backdrop)", () => {
    const dialog = document.createElement("dialog");
    document.body.append(dialog);
    dialog.showModal();
    render(<ToastProvider><Trigger text="Ссылка добавлена" /></ToastProvider>);
    act(() => screen.getByText("go").click());
    expect(dialog).toContainElement(screen.getByRole("status"));
    dialog.remove();
  });
  it("тост переезжает в body, если диалог закрылся", () => {
    try {
      const dialog = document.createElement("dialog");
      document.body.append(dialog);
      dialog.showModal();
      render(<ToastProvider><Trigger text="Сохранено" /></ToastProvider>);
      act(() => screen.getByText("go").click());
      expect(dialog).toContainElement(screen.getByRole("status"));
      act(() => dialog.close());
      expect(document.body).toContainElement(screen.getByRole("status"));
      expect(dialog).not.toContainElement(screen.getByRole("status"));
    } finally {
      document.querySelectorAll("dialog").forEach((d) => d.remove());
    }
  });
  it("useToast вне провайдера — понятная ошибка", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Trigger text="x" />)).toThrow("useToast вне ToastProvider");
  });
});
