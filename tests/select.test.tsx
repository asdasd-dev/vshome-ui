import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Select, Sheet } from "../src";
import { setMobile } from "./media";

const PRIORITIES = [
  { value: "high", label: "🔴 высокий" },
  { value: "normal", label: "🟡 обычный" },
  { value: "low", label: "🟢 низкий" },
] as const;
type P = (typeof PRIORITIES)[number]["value"];

function Harness({ onChange = () => {} }: { onChange?: (v: P) => void }) {
  const [v, setV] = useState<P>("normal");
  return <Select label="Приоритет" value={v} onChange={(x) => { setV(x); onChange(x); }} options={[...PRIORITIES]} />;
}

describe("Select", () => {
  it("триггер назван подписью и показывает подпись выбранного", () => {
    render(<Harness />);
    expect(screen.getByRole("combobox", { name: "Приоритет" })).toHaveTextContent("🟡 обычный");
    expect(screen.getByText("Приоритет")).toHaveClass("vs-select__label");
  });
  it("выбор пункта зовёт onChange со значением", async () => {
    const onChange = vi.fn();
    render(<Harness onChange={onChange} />);
    await userEvent.click(screen.getByRole("combobox", { name: "Приоритет" }));
    await userEvent.click(await screen.findByRole("option", { name: "🟢 низкий" }));
    expect(onChange).toHaveBeenCalledWith("low");
    await waitFor(() => expect(screen.getByRole("combobox", { name: "Приоритет" })).toHaveTextContent("🟢 низкий"));
  });
  it("не вставляет inline <style> (CSP сайтов: style-src 'self')", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("combobox", { name: "Приоритет" }));
    await screen.findByRole("listbox");
    expect(document.querySelectorAll("style").length).toBe(0);
  });
  it("внутри открытого листа выбор не закрывает лист", async () => {
    const onRequestClose = vi.fn();
    render(<Sheet open onRequestClose={onRequestClose} head="T-1"><Harness /></Sheet>);
    await userEvent.click(screen.getByRole("combobox", { name: "Приоритет" }));
    await userEvent.click(await screen.findByRole("option", { name: "🔴 высокий" }));
    expect(onRequestClose).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  describe.each([["десктоп", false], ["телефон", true]])("клик по фону при открытом списке (%s)", (_, mobile) => {
    afterEach(() => act(() => setMobile(false)));
    it("закрывает только список, следующий — лист", async () => {
      act(() => setMobile(mobile));
      const onRequestClose = vi.fn();
      render(<Sheet open onRequestClose={onRequestClose} head="T-1"><Harness /></Sheet>);
      await userEvent.click(screen.getByRole("combobox", { name: "Приоритет" }));
      await screen.findByRole("listbox");
      const backdrop = () => document.querySelector(".vs-sheet-backdrop") as HTMLElement;
      await userEvent.click(backdrop());
      await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
      expect(onRequestClose).not.toHaveBeenCalled();
      await userEvent.click(backdrop());
      expect(onRequestClose).toHaveBeenCalledTimes(1);
    });
  });
});
