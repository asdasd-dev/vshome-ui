import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Artwork, Banner, Card, Disclosure, EmptyState, KeyValue, Legend, PageHeader, Progress, SectionHeader, SplitBar, StatusDot, Table, Tabs, Tag } from "../src";
import { allCss } from "./css";

describe("PageHeader", () => {
  it("заголовок, подзаголовок, лого, действия, строка под ним; липкая; акцентная", () => {
    const { container } = render(<PageHeader title="Лента" sub="цены и списки" lead={<span>🛒</span>} actions={<button type="button">Выйти</button>} sticky tone="accent"><nav>вкладки</nav></PageHeader>);
    const h = container.querySelector("header")!;
    for (const c of ["vs-page-header", "vs-page-header--accent", "vs-page-header--sticky"]) expect(h.className, c).toContain(c);
    expect(screen.getByRole("heading", { level: 1, name: "Лента" })).toBeTruthy();
    expect(h.querySelector(".vs-page-header__sub")!.textContent).toBe("цены и списки");
    expect(h.querySelector(".vs-page-header__extra")!.textContent).toBe("вкладки");
  });
});

describe("Tabs", () => {
  it("вкладки: выбранная, иконка, счётчик, переключение", async () => {
    const onChange = vi.fn();
    render(<Tabs label="Разделы" value="list" onChange={onChange} items={[{ value: "list", label: "Список", icon: "check", count: 3 }, { value: "search", label: "Поиск", icon: "search" }]} />);
    const tl = screen.getByRole("tablist", { name: "Разделы" });
    expect(within(tl).getByRole("tab", { name: /Список/ })).toHaveAttribute("aria-selected", "true");
    expect(within(tl).getByRole("tab", { name: /Список/ }).querySelector(".vs-badge")!.textContent).toBe("3");
    await userEvent.click(within(tl).getByRole("tab", { name: /Поиск/ }));
    expect(onChange).toHaveBeenCalledWith("search");
  });
  it("ссылки — навигация с aria-current; нижняя панель на телефоне", () => {
    const { container } = render(<Tabs label="Меню" value="b" variant="bottom" items={[{ value: "a", label: "А", href: "/a" }, { value: "b", label: "Б", href: "/b" }]} />);
    expect(screen.getByRole("navigation", { name: "Меню" }).className).toContain("vs-tabs--bottom");
    expect(screen.getByRole("link", { name: "Б" })).toHaveAttribute("aria-current", "page");
    expect(container.querySelector("[role=tablist]")).toBeNull();
    expect(allCss()).toMatch(/@media \(max-width: 760px\)[^{]*\{\s*\.vs-tabs--bottom \{[^}]*position: fixed/);
  });
});

describe("Card", () => {
  it("тон, полоса, отступы, тень; кликабельная — кнопка, со ссылкой — ссылка", () => {
    const onClick = vi.fn();
    const { container } = render(<>
      <Card tone="warn" stripe="danger" padding="sm" elevated as="article">a</Card>
      <Card onClick={onClick}>b</Card>
      <Card href="/x" stripe="#123456">c</Card>
    </>);
    const a = container.querySelector("article")!;
    for (const k of ["vs-card", "vs-card--warn", "vs-card--pad-sm", "vs-card--elevated", "vs-card--stripe"]) expect(a.className, k).toContain(k);
    expect(a.style.getPropertyValue("--vs-card-stripe")).toBe("var(--vs-danger)");
    fireEvent.click(screen.getByRole("button", { name: "b" }));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByRole("link", { name: "c" }).style.getPropertyValue("--vs-card-stripe")).toBe("#123456");
  });
});

describe("Disclosure", () => {
  it("summary раскрывает содержимое, onToggle сообщает состояние", () => {
    const onToggle = vi.fn();
    const { container } = render(<Disclosure summary="Состав" onToggle={onToggle}>мука, вода</Disclosure>);
    const d = container.querySelector("details")!;
    expect(d.querySelector("summary")!.textContent).toContain("Состав");
    d.open = true;
    fireEvent(d, new Event("toggle"));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});

describe("EmptyState и Banner box", () => {
  it("пустое состояние: заголовок, текст, действие", () => {
    render(<EmptyState title="Пусто" icon="search" action={<button type="button">Обновить</button>}>Ничего не нашлось</EmptyState>);
    expect(screen.getByText("Пусто").closest(".vs-empty")).not.toBeNull();
    expect(screen.getByRole("button", { name: "Обновить" })).toBeTruthy();
  });
  it("Banner box: заголовок, действие, тон accent", () => {
    render(<Banner variant="box" tone="accent" title="Есть обновление" action={<button type="button">Обновить</button>}>Новая версия</Banner>);
    const b = screen.getByRole("status");
    for (const k of ["vs-banner--box", "vs-banner--accent"]) expect(b.className).toContain(k);
    expect(b.querySelector(".vs-banner__title")!.textContent).toBe("Есть обновление");
    expect(b.querySelector("[data-icon=info]")).not.toBeNull();
  });
});

describe("Progress и SplitBar", () => {
  it("Progress: progressbar со значениями и шириной", () => {
    render(<Progress label="Пройдено" value={30} max={60} tone="ok" />);
    const p = screen.getByRole("progressbar", { name: "Пройдено" });
    expect(p).toHaveAttribute("aria-valuenow", "30");
    expect(p).toHaveAttribute("aria-valuemax", "60");
    expect((p.querySelector(".vs-progress__fill") as HTMLElement).style.width).toBe("50%");
  });
  it("SplitBar: части пропорционально, подпись для скринридера", () => {
    render(<SplitBar label="Расход" parts={[{ value: 3, tone: "accent", label: "Мак" }, { value: 1, color: "#ff8800", label: "бокс" }]} />);
    const s = screen.getByRole("img", { name: "Расход: Мак 3, бокс 1" });
    const parts = s.querySelectorAll<HTMLElement>(".vs-split-bar__part");
    expect([parts[0]!.style.flexGrow, parts[1]!.style.flexGrow]).toEqual(["3", "1"]);
  });
});

describe("Table", () => {
  it("колонки, числа справа, пустая, клик и Enter по строке", () => {
    const onRowClick = vi.fn();
    const rows = [{ id: 1, name: "Мак", cost: 12 }, { id: 2, name: "бокс", cost: 3 }];
    render(<Table caption="Расходы" rowKey={(r) => r.id} onRowClick={onRowClick} rows={rows} columns={[{ key: "name", label: "Где" }, { key: "cost", label: "$", numeric: true, render: (r) => `$${r.cost}` }]} />);
    const t = screen.getByRole("table", { name: "Расходы" });
    expect(within(t).getAllByRole("columnheader").map((x) => x.textContent)).toEqual(["Где", "$"]);
    expect(within(t).getByText("$12").className).toContain("vs-table__cell--numeric");
    fireEvent.click(within(t).getByText("Мак"));
    fireEvent.keyDown(within(t).getByText("бокс").closest("tr")!, { key: "Enter" });
    expect(onRowClick.mock.calls.map((c) => c[0].id)).toEqual([1, 2]);
  });
  it("пустая таблица — текст", () => {
    render(<Table rowKey={(r: { id: number }) => r.id} rows={[]} columns={[{ key: "id", label: "id" }]} empty="нет данных" />);
    expect(screen.getByText("нет данных")).toBeTruthy();
  });
});

describe("KeyValue, Legend, StatusDot, SectionHeader", () => {
  it("KeyValue: dl с подписями и значениями, колонки", () => {
    const { container } = render(<KeyValue cols={2} items={[{ label: "Белки", value: "12 г" }, { label: "Цена", value: "99 ₽", tone: "ok", hint: "за кг" }]} />);
    const dl = container.querySelector("dl")!;
    expect(dl.className).toContain("vs-kv--cols-2");
    expect([...dl.querySelectorAll("dt")].map((x) => x.textContent)).toEqual(["Белки", "Цена"]);
    expect(dl.querySelectorAll("dd")[1]!.className).toContain("vs-kv__value--ok");
  });
  it("Legend: метки с формой и цветом", () => {
    const { container } = render(<Legend items={[{ label: "Швеция", tone: "accent" }, { label: "Германия", color: "#0a0", shape: "line" }]} />);
    const sw = container.querySelectorAll<HTMLElement>(".vs-legend__swatch");
    expect(sw[0]!.className).toContain("vs-legend__swatch--dot");
    expect(sw[1]!.className).toContain("vs-legend__swatch--line");
    expect(sw[1]!.style.getPropertyValue("--vs-legend-color")).toBe("#0a0");
  });
  it("StatusDot: тон, пульс, подпись", () => {
    render(<StatusDot tone="ok" pulse label="работает" />);
    expect(screen.getByRole("img", { name: "работает" }).className).toBe("vs-status-dot vs-status-dot--ok vs-status-dot--pulse");
  });
  it("SectionHeader: заголовок нужного уровня, счётчик, справа", () => {
    render(<SectionHeader title="Бэклог" count={4} aside="по дате" as="h3" />);
    const h = screen.getByRole("heading", { level: 3, name: /Бэклог/ });
    expect(h.closest(".vs-section-header")!.textContent).toContain("по дате");
    expect(h.closest(".vs-section-header")!.querySelector(".vs-badge")!.textContent).toBe("4");
  });
});

describe("Artwork и цвета категорий", () => {
  it("без картинки — заглушка, размеры sm/md/lg", () => {
    const { container } = render(<><Artwork fallback="🥛" size="sm" /><Artwork src="data:," alt="фото" size="md" /></>);
    const f = container.querySelector(".vs-artwork--fallback")!;
    expect(f.textContent).toBe("🥛");
    expect(f.className).toContain("vs-artwork--sm");
    fireEvent.error(screen.getByRole("img", { name: "фото" }));
    expect(container.querySelectorAll(".vs-artwork--fallback")).toHaveLength(2);
  });
  it("Tag в цветах категорий", () => {
    render(<Tag tone="violet">магазин</Tag>);
    expect(screen.getByText("магазин").className).toContain("vs-tag--violet");
    expect(allCss()).toMatch(/\.vs-tag--violet \{[^}]*--vs-tag-fg: var\(--vs-violet\)/);
  });
});
