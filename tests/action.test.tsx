import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ACTION_FAILED_MS, Button, IconButton, SplitButton } from "../src";

const deferred = <T,>() => {
  let resolve!: (v: T) => void, reject!: (e: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
};

describe("кнопка с Promise в onClick", () => {
  it("IconButton: занята и со спиннером, пока не выполнены все нажатия; повторное нажатие уходит", async () => {
    const d = deferred<boolean>();
    const d2 = deferred<boolean>();
    const onClick = vi.fn().mockReturnValueOnce(d.promise).mockReturnValueOnce(d2.promise);
    render(<IconButton icon="next" label="Следующий трек" onClick={onClick} />);
    const b = screen.getByRole("button", { name: "Следующий трек" });
    await userEvent.click(b);
    expect(b).toHaveAttribute("aria-busy", "true");
    expect(b.querySelector(".vs-spinner")).not.toBeNull();
    await userEvent.click(b);
    expect(onClick).toHaveBeenCalledTimes(2);
    await act(async () => { d.resolve(true); await d.promise; });
    expect(b).toHaveAttribute("aria-busy", "true");
    await act(async () => { d2.resolve(true); await d2.promise; });
    expect(b).not.toHaveAttribute("aria-busy");
    expect(b).not.toHaveAttribute("data-failed");
    expect(b.querySelector(".vs-spinner")).toBeNull();
  });

  it("Button: false или отказ — отметка ошибки, через ACTION_FAILED_MS снимается", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      const d = deferred<boolean>();
      render(<Button onClick={() => d.promise}>Парадная</Button>);
      const b = screen.getByRole("button", { name: "Парадная" });
      await userEvent.click(b);
      expect(b).toHaveAttribute("aria-busy", "true");
      await act(async () => { d.reject(new Error("502")); await d.promise.catch(() => {}); });
      expect(b).toHaveAttribute("data-failed", "true");
      expect(b).not.toBeDisabled();
      await act(async () => { vi.advanceTimersByTime(ACTION_FAILED_MS); });
      expect(b).not.toHaveAttribute("data-failed");
    } finally { vi.useRealTimers(); }
  });

  it("Button: false — тоже ошибка", async () => {
    render(<Button onClick={() => Promise.resolve(false)}>Ночной</Button>);
    const b = screen.getByRole("button", { name: "Ночной" });
    await userEvent.click(b);
    expect(await screen.findByRole("button", { name: "Ночной" })).toHaveAttribute("data-failed", "true");
  });

  it("обычный onClick без Promise — без занятости", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Открыть</Button>);
    const b = screen.getByRole("button", { name: "Открыть" });
    await userEvent.click(b);
    await userEvent.click(b);
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(b).not.toHaveAttribute("aria-busy");
  });

  it("SplitButton: основная часть занята до ответа, лампа сменяется спиннером", async () => {
    const d = deferred<boolean>();
    const { container } = render(<SplitButton indicator="lamp" onClick={() => d.promise} more={{ label: "Кухня: лампы", onClick: () => {} }}>Кухня</SplitButton>);
    const main = screen.getByRole("button", { name: "Кухня" });
    await userEvent.click(main);
    expect(main).toHaveAttribute("aria-busy", "true");
    expect(container.querySelector(".vs-split__spinner")).not.toBeNull();
    expect(main).not.toBeDisabled();
    expect(screen.getByRole("button", { name: "Кухня: лампы" })).not.toBeDisabled();
    await act(async () => { d.resolve(true); await d.promise; });
    expect(main).not.toHaveAttribute("aria-busy");
    expect(container.querySelector(".vs-split__spinner")).toBeNull();
  });
});
