import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Banner, List, ListRow, Stat, Tile } from "../src";

describe("Tile", () => {
  it("секция с подписью, тоном и подвалом в конце", () => {
    render(<Tile label="Агенты" tone="warn" footer={<span>подвал</span>}><p>тело</p></Tile>);
    const t = screen.getByRole("region", { name: "Агенты" });
    expect(t.className).toContain("vs-tile--warn");
    expect(t.lastElementChild!.textContent).toBe("подвал");
  });
  it("плитка не бывает кнопкой — внутри можно класть кнопки", () => {
    // @ts-expect-error onClick у плитки нет
    render(<Tile label="Встреча" onClick={() => {}} footer={<button type="button">Войти</button>}>x</Tile>);
    const t = screen.getByRole("region", { name: "Встреча" });
    expect(t.tagName).toBe("SECTION");
    expect(t.querySelector("button button")).toBeNull();
  });
});

describe("Stat", () => {
  it("значение, единица, подпись, размер и тон", () => {
    const { container } = render(<Stat value={14} unit="мин" caption="до встречи" size="xl" tone="warn" />);
    const s = container.firstElementChild!;
    expect(s.className).toContain("vs-stat--xl");
    expect(s.className).toContain("vs-stat--warn");
    expect(within(s as HTMLElement).getByText("14")).toBeTruthy();
    expect(within(s as HTMLElement).getByText("мин")).toBeTruthy();
    expect(within(s as HTMLElement).getByText("до встречи")).toBeTruthy();
  });
});

describe("List и ListRow", () => {
  it("max показывает «ещё N»", () => {
    render(<List max={2}>{["a", "b", "c", "d"].map((x) => <ListRow key={x} title={x} />)}</List>);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("ещё 2")).toBeTruthy();
  });
  it("пустой — текст empty", () => {
    render(<List empty="никто не ждёт">{[]}</List>);
    expect(screen.getByText("никто не ждёт")).toBeTruthy();
  });
  it("строка: заголовок, мета, тон, клик", async () => {
    const onClick = vi.fn();
    render(<List><ListRow title="Sync agenda" meta="12 мин" tone="warn" onClick={onClick} /></List>);
    const b = screen.getByRole("button", { name: /Sync agenda/ });
    expect(b.textContent).toContain("12 мин");
    expect(b.closest("li")!.className).toContain("vs-list-row--warn");
    await userEvent.click(b);
    expect(onClick).toHaveBeenCalled();
  });
});

describe("Banner", () => {
  it("статус с иконкой и тоном", () => {
    const { container } = render(<Banner tone="danger">Мак недоступен</Banner>);
    const b = screen.getByRole("status");
    expect(b.textContent).toBe("Мак недоступен");
    expect(b.className).toContain("vs-banner--danger");
    expect(container.querySelector("svg[data-icon=alert]")).not.toBeNull();
  });
});
