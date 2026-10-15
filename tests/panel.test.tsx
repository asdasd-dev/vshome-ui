import { fireEvent, render, screen, within } from "@testing-library/react";
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
  it("aside — справа в строке подписи, подпись остаётся именем плитки", () => {
    const { container } = render(<Tile label="Ждут тебя · 3" aside="1 работает">x</Tile>);
    const t = screen.getByRole("region", { name: "Ждут тебя · 3" });
    const head = container.querySelector(".vs-tile__head")!;
    expect(head.querySelector(".vs-tile__label")!.textContent).toBe("Ждут тебя · 3");
    expect(head.querySelector(".vs-tile__aside")!.textContent).toBe("1 работает");
    expect(t.contains(head)).toBe(true);
  });
  it("без aside разметка прежняя", () => {
    const { container } = render(<Tile label="Агенты">x</Tile>);
    expect(container.querySelector(".vs-tile__head")).toBeNull();
    expect(container.querySelector(".vs-tile > .vs-tile__label")).not.toBeNull();
  });
  it("плитка не бывает кнопкой — внутри можно класть кнопки", () => {
    // @ts-expect-error onClick у плитки нет
    render(<Tile label="Встреча" onClick={() => {}} footer={<button type="button">Войти</button>}>x</Tile>);
    const t = screen.getByRole("region", { name: "Встреча" });
    expect(t.tagName).toBe("SECTION");
    expect(t.querySelector("button button")).toBeNull();
  });
});

describe("Tile scroll: затемнение переполнения", () => {
  const size = (el: HTMLElement, sh: number, ch: number, st = 0) => {
    Object.defineProperty(el, "scrollHeight", { configurable: true, value: sh });
    Object.defineProperty(el, "clientHeight", { configurable: true, value: ch });
    el.scrollTop = st;
  };
  it("не влезает — снизу затемнение; прокрутил — сверху и снизу; до конца — только сверху", () => {
    const { container, rerender } = render(<Tile label="Новости" scroll>a</Tile>);
    const body = container.querySelector(".vs-tile__body") as HTMLElement;
    expect(body.className).toContain("vs-tile__body--scroll");
    size(body, 500, 200);
    rerender(<Tile label="Новости" scroll>b</Tile>);
    expect(body.dataset.fade).toBe("bottom");
    size(body, 500, 200, 100);
    fireEvent.scroll(body);
    expect(body.dataset.fade).toBe("top bottom");
    size(body, 500, 200, 300);
    fireEvent.scroll(body);
    expect(body.dataset.fade).toBe("top");
  });
  it("влезает — без затемнения; без scroll — тело прежнее", () => {
    const { container } = render(<Tile label="Дела" scroll>a</Tile>);
    expect((container.querySelector(".vs-tile__body") as HTMLElement).dataset.fade).toBeUndefined();
    const plain = render(<Tile label="Скоро">a</Tile>).container.querySelector(".vs-tile__body") as HTMLElement;
    expect(plain.className).toBe("vs-tile__body");
  });
  it("стили: прокрутка без полосы, маски краёв", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const css = fs.readFileSync(path.join(__dirname, "..", "src", "components", "Panel.css"), "utf8");
    expect(css).toMatch(/\.vs-tile__body--scroll \{[^}]*overflow-y: auto/);
    expect(css).toMatch(/\.vs-tile__body--scroll\[data-fade="bottom"\] \{[^}]*mask-image/);
    expect(css).toMatch(/\.vs-tile__body--scroll\[data-fade="top"\] \{[^}]*mask-image/);
    expect(css).toMatch(/\.vs-tile__body--scroll\[data-fade="top bottom"\] \{[^}]*mask-image/);
  });
});

describe("ListRow titleLines", () => {
  it("заголовок в две строки — со второй строкой и без", () => {
    render(<List><ListRow title="Наблюдаемость агентов" sub="Claude" titleLines={2} /><ListRow title="Кардиолог" titleLines={2} /></List>);
    expect(document.querySelector(".vs-list-row__name")!.className).toContain("vs-list-row__name--2");
    expect(document.querySelectorAll(".vs-list-row__title")[1]!.className).toContain("vs-list-row__title--2");
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

describe("ListRow sub", () => {
  it("вторая строка под заголовком, тон отдельно", () => {
    render(<List><ListRow lead="14 мин" title="GD · BX-55704" sub="Нужно разрешение: git push" subTone="warn" onClick={() => {}} /></List>);
    const li = screen.getByRole("listitem");
    expect(li.className).toContain("vs-list-row--two");
    expect(li.querySelector(".vs-list-row__name")!.textContent).toBe("GD · BX-55704");
    const sub = li.querySelector(".vs-list-row__sub")!;
    expect(sub.textContent).toBe("Нужно разрешение: git push");
    expect(sub.className).toContain("vs-list-row__sub--warn");
  });
  it("без sub строка прежняя", () => {
    render(<List><ListRow title="Sync" /></List>);
    const li = screen.getByRole("listitem");
    expect(li.className).not.toContain("--two");
    expect(li.querySelector(".vs-list-row__sub")).toBeNull();
    expect(li.querySelector(".vs-list-row__title")!.textContent).toBe("Sync");
  });
  it("стили: две строки с обрезкой каждой, sub мельче и серым", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const css = fs.readFileSync(path.join(__dirname, "..", "src", "components", "Panel.css"), "utf8");
    expect(css).toMatch(/\.vs-list-row--two \.vs-list-row__inner \{[^}]*align-items: flex-start/);
    expect(css).toMatch(/\.vs-list-row__name, \.vs-list-row__sub \{[^}]*overflow: hidden[^}]*white-space: nowrap[^}]*text-overflow: ellipsis/);
    expect(css).toMatch(/\.vs-list-row__sub \{[^}]*font-size: var\(--vs-text-sm\)[^}]*color: var\(--vs-muted\)/);
    expect(css).toMatch(/\.vs-list-row__sub--warn \{[^}]*color: var\(--vs-warn\)/);
    expect(css).toMatch(/\.vs-tile__head \{[^}]*display: flex[^}]*justify-content: space-between/);
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
