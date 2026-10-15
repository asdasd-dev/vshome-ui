import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Container, Grid, KeyValue, ListRow, Price, RangeSlider, Show, SidebarLayout, Text } from "../src";
import { TimeChart } from "../src/charts";

describe("адаптивность", () => {
  it("Grid: колонки по классам устройств — переменными; по минимальной ширине — классом", () => {
    const { container } = render(<><Grid cols={{ phone: 1, tablet: 2, desktop: 4 }}><span>a</span></Grid><Grid min="sm"><span>b</span></Grid></>);
    const [a, b] = [...container.querySelectorAll<HTMLElement>(".vs-grid__items")];
    expect(a!.style.getPropertyValue("--vs-grid-cols")).toBe("1");
    expect(a!.style.getPropertyValue("--vs-grid-cols-tablet")).toBe("2");
    expect(a!.style.getPropertyValue("--vs-grid-cols-desktop")).toBe("4");
    expect(b!.className).toContain("vs-grid__items--min-sm");
  });
  it("KeyValue: колонки по классам устройств", () => {
    const { container } = render(<KeyValue cols={{ phone: 2, desktop: 4 }} items={[{ label: "a", value: 1 }]} />);
    expect(container.querySelector<HTMLElement>("dl")!.style.getPropertyValue("--vs-grid-cols-desktop")).toBe("4");
  });
  it("Container, Show, SidebarLayout — классы", () => {
    const { container } = render(<Container size="md"><Show above="tablet">x</Show><SidebarLayout sidebar={<nav>n</nav>} side="end" sticky>m</SidebarLayout></Container>);
    expect(container.querySelector(".vs-container--md")).not.toBeNull();
    expect(container.querySelector(".vs-show--above-tablet")).not.toBeNull();
    expect(container.querySelector(".vs-sidebar-layout--end .vs-sidebar-layout__side--sticky")).not.toBeNull();
  });
});

describe("доработки для сайтов", () => {
  it("Text в цветах категорий", () => {
    render(<Text tone="gold">★ 4,7</Text>);
    expect(screen.getByText("★ 4,7").className).toContain("vs-text--gold");
  });
  it("ListRow-ссылка и выравнивание по центру", () => {
    render(<ul><ListRow title="Чек 12.10" href="#/r/1" align="center" /></ul>);
    const a = screen.getByRole("link", { name: "Чек 12.10" });
    expect(a).toHaveAttribute("href", "#/r/1");
    expect(a.closest("li")!.className).toContain("vs-list-row--center");
  });
  it("Price: рубли и копейки, старая цена, подпись для скринридера", () => {
    render(<Price value={18990} old={25900} unit="кг" />);
    expect(screen.getByLabelText("189,90 ₽/кг, было 259,00 ₽")).toBeTruthy();
  });
  it("RangeSlider: два бегунка, отдаёт пару при отпускании", () => {
    const onCommit = vi.fn();
    render(<RangeSlider label="Скидка" value={[40, 100]} format={(v) => `${v}%`} onCommit={onCommit} />);
    const lo = screen.getByRole("slider", { name: "Скидка: от" });
    expect(lo).toHaveAttribute("aria-valuetext", "40%");
    fireEvent.change(lo, { target: { value: "50" } });
    fireEvent.pointerUp(lo);
    expect(onCommit).toHaveBeenCalledWith(50, 100);
  });
  it("TimeChart рисуется по точкам с датами", () => {
    const { container } = render(<TimeChart label="Цена" series={[{ name: "цена", color: "red", points: [[1, 10], [5, 12]] }]} refLines={[{ y: 11, label: "медиана" }]} />);
    expect(container.querySelector(".vs-chart")).not.toBeNull();
  });
});

describe("доработки для доски", async () => {
  const { Chip, Disclosure, SectionHeader, Segment, TextField } = await import("../src");
  const { createRef } = await import("react");
  it("Chip external открывается в новой вкладке", () => {
    render(<Chip href="https://a.example" external>курс</Chip>);
    expect(screen.getByRole("link", { name: /курс/ })).toHaveAttribute("target", "_blank");
  });
  it("SectionHeader: счётчик-строка с тоном", () => {
    const { container } = render(<SectionHeader title="To do" count="8/7" countTone="danger" countLabel="сверх лимита" />);
    expect(container.querySelector(".vs-badge--danger")!.textContent).toBe("8/7");
  });
  it("TextField отдаёт ref на поле; Disclosure принимает id", () => {
    const ref = createRef<HTMLInputElement>();
    const { container } = render(<><TextField label="Ответ" value="" onChange={() => {}} ref={ref} /><Disclosure id="stage-2" summary="Этап 2">x</Disclosure></>);
    expect(ref.current?.tagName).toBe("INPUT");
    expect(container.querySelector("details#stage-2")).not.toBeNull();
  });
  it("Segment progress: ползунок по дробной позиции", () => {
    const { container } = render(<Segment label="Колонки" value="b" onChange={() => {}} progress={1.5} options={[{ value: "a", label: "A" }, { value: "b", label: "B" }, { value: "c", label: "C" }]} />);
    const g = container.querySelector<HTMLElement>(".vs-segment--thumb")!;
    expect(g.style.getPropertyValue("--vs-segment-pos")).toBe("1.5");
    expect(g.querySelector(".vs-segment__thumb")).not.toBeNull();
  });
});

describe("доработки для дашборда", async () => {
  const { Card, KeyValue, Tabs, Text } = await import("../src");
  it("Card-ссылка во внешнюю вкладку; Card-кнопка с aria-expanded", () => {
    render(<><Card href="/grafana/" external>Графики</Card><Card onClick={() => {}} expanded controls="media">Медиа</Card></>);
    expect(screen.getByRole("link", { name: "Графики" })).toHaveAttribute("target", "_blank");
    const b = screen.getByRole("button", { name: "Медиа" });
    expect(b).toHaveAttribute("aria-expanded", "true");
    expect(b).toHaveAttribute("aria-controls", "media");
  });
  it("Tabs sticky, KeyValue auto, Text id", () => {
    const { container } = render(<><Tabs label="Разделы" value="a" sticky items={[{ value: "a", label: "A" }]} /><KeyValue cols="auto" items={[{ label: "x", value: 1 }]} /><Text id="snap">12:00</Text></>);
    expect(container.querySelector(".vs-tabs--sticky")).not.toBeNull();
    expect(container.querySelector(".vs-kv--auto")).not.toBeNull();
    expect(container.querySelector("#snap")!.textContent).toBe("12:00");
  });
});

describe("безопасные зоны экрана", async () => {
  const { allCss } = await import("./css");
  it("шапка и контейнер не залезают под вырез и статус-бар", () => {
    expect(allCss()).toMatch(/\.vs-page-header \{[^}]*env\(safe-area-inset-top/);
    expect(allCss()).toMatch(/\.vs-container \{[^}]*env\(safe-area-inset-left/);
  });
});

describe("правки 0.24", async () => {
  const { Grid, Price, Segment, Text } = await import("../src");
  const { createRef } = await import("react");
  const { allCss } = await import("./css");
  it("Price: без «00» у целой цены, ценник акции — свой яркий токен", () => {
    const { container } = render(<><Price value={129900} tone="deal" /><Price value={129900} kopecks="always" /></>);
    expect(container.querySelectorAll(".vs-price__kop")).toHaveLength(1);
    expect(allCss()).toMatch(/\.vs-price--deal \{[^}]*var\(--vs-deal\)/);
  });
  it("Text align, Grid 2xs, Segment ref и @property", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(<><Text align="center">a</Text><Grid min="2xs"><span>b</span></Grid><Segment label="x" value="a" onChange={() => {}} options={[{ value: "a", label: "A" }]} ref={ref} /></>);
    expect(container.querySelector(".vs-text--align-center")).not.toBeNull();
    expect(container.querySelector(".vs-grid__items--min-2xs")).not.toBeNull();
    expect(ref.current?.getAttribute("role")).toBe("group");
    expect(allCss()).toContain("@property --vs-segment-pos");
  });
  it("нижние вкладки на телефоне не берут светлые цвета акцентной шапки", () => {
    expect(allCss()).toMatch(/\.vs-tabs--bottom \{ --vs-tabs-fg: var\(--vs-muted\)/);
  });
});
