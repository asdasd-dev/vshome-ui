import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Badge, IconButton, Segment, Select, Slider, Table, ToastProvider, useToast } from "../src";

describe("единообразие API", () => {
  it("IconButton: loading — недоступна и занята, plain — то же, что secondary", () => {
    const { container } = render(<><IconButton icon="next" label="Дальше" loading /><IconButton icon="prev" label="Назад" variant="plain" /></>);
    const b = screen.getByRole("button", { name: "Дальше" });
    expect(b).toBeDisabled();
    expect(b).toHaveAttribute("aria-busy", "true");
    expect(container.querySelectorAll(".vs-icon-button--secondary")).toHaveLength(2);
  });
  it("Slider: скринридер слышит отформатированное значение; выключается", () => {
    render(<Slider label="Яркость" value={70} format={(v) => `${v}%`} onCommit={() => {}} disabled />);
    const s = screen.getByRole("slider", { name: "Яркость" });
    expect(s).toHaveAttribute("aria-valuetext", "70%");
    expect(s).toBeDisabled();
  });
  it("Segment: выключенная опция", () => {
    render(<Segment label="Вид" value="a" onChange={() => {}} options={[{ value: "a", label: "Доска" }, { value: "b", label: "Бэклог", disabled: true }]} />);
    expect(screen.getByRole("button", { name: "Бэклог" })).toBeDisabled();
  });
  it("Select: подсказка и ошибка связаны с полем", () => {
    render(<Select label="Приоритет" hint="влияет на порядок" error="выберите" value="a" onChange={() => {}} options={[{ value: "a", label: "обычный" }]} />);
    const t = screen.getByRole("combobox");
    expect(t).toHaveAttribute("aria-invalid", "true");
    expect(t.getAttribute("aria-describedby")!.split(" ").map((id) => document.getElementById(id)!.textContent)).toEqual(["влияет на порядок", "выберите"]);
  });
  it("Table: настоящий caption, пробел открывает строку", () => {
    const onRowClick = vi.fn();
    render(<Table caption="Сервисы" rowKey={(r: { n: string }) => r.n} rows={[{ n: "vpn" }]} columns={[{ key: "n", label: "Имя" }]} onRowClick={onRowClick} />);
    expect(screen.getByRole("table", { name: "Сервисы" }).querySelector("caption")).not.toBeNull();
    fireEvent.keyDown(screen.getByText("vpn").closest("tr")!, { key: " " });
    expect(onRowClick).toHaveBeenCalled();
  });
  it("Badge без содержимого не выводится; с подписью — картинка с именем", () => {
    const { container } = render(<><Badge /><Badge label="3 новых">3</Badge></>);
    expect(container.querySelectorAll(".vs-badge")).toHaveLength(1);
    expect(screen.getByRole("img", { name: "3 новых" })).toBeTruthy();
  });
  it("ToastProvider: className на тосте — для киоска", () => {
    function Fire() { const t = useToast(); return <button type="button" onClick={() => t("Готово")}>ок</button>; }
    render(<ToastProvider className="vs-kiosk"><Fire /></ToastProvider>);
    fireEvent.click(screen.getByRole("button", { name: "ок" }));
    expect(screen.getByRole("status").className).toBe("vs-toast vs-kiosk");
  });
});
