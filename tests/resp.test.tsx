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
    fireEvent.blur(lo);
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

describe("правки 0.25", async () => {
  const { Grid, Segment } = await import("../src");
  const { allCss } = await import("./css");
  it("Grid dense — плотная укладка", () => {
    const { container } = render(<Grid min="2xs" dense><span>a</span></Grid>);
    expect(container.querySelector(".vs-grid__items--dense")).not.toBeNull();
    expect(allCss()).toMatch(/\.vs-grid__items--dense \{ grid-auto-flow: row dense; \}/);
  });
  it("Segment с ползунком: подписи под ползунком — копия поверх, обрезанная по его позиции", () => {
    const { container } = render(<Segment label="x" value="b" onChange={() => {}} progress={0.5} options={[{ value: "a", label: "A" }, { value: "b", label: "B" }]} />);
    const thumb = container.querySelector(".vs-segment__thumb")!;
    expect(thumb.getAttribute("aria-hidden")).toBe("true");
    expect([...thumb.querySelectorAll("span")].map((x) => x.textContent)).toEqual(["A", "B"]);
    expect(container.querySelectorAll("button")).toHaveLength(2);
    expect(allCss()).toMatch(/\.vs-segment__thumb \{[^}]*clip-path: inset\(/);
  });
});

describe("правки 0.26", async () => {
  const { Container, Grid, PageHeader } = await import("../src");
  const { allCss } = await import("./css");
  it("Grid fixed — колонки ровно min шириной, прижаты к началу", () => {
    const { container } = render(<Grid min="2xs" fixed><span>a</span></Grid>);
    expect(container.querySelector(".vs-grid__items--fixed.vs-grid__items--min-2xs")).not.toBeNull();
    expect(allCss()).toMatch(/\.vs-grid__items--min-2xs \{ --vs-grid-min: calc\(80px/);
    expect(allCss()).toMatch(/\.vs-grid__items\.vs-grid__items--fixed \{ grid-template-columns: repeat\(auto-fill, min\(100%, var\(--vs-grid-min\)\)\); justify-content: start; \}/);
  });
  it("fixed без min не действует", () => {
    const { container } = render(<Grid fixed cols={2}><span>a</span></Grid>);
    expect(container.querySelector(".vs-grid__items--fixed")).toBeNull();
  });
  it("PageHeader в Container — без своих боковых полей", () => {
    const { container } = render(<Container><PageHeader title="x" /></Container>);
    expect(container.querySelector(".vs-container .vs-page-header")).not.toBeNull();
    expect(allCss()).toMatch(/\.vs-container \{ --vs-page-header-ps: 0; --vs-page-header-pe: 0;/);
    expect(allCss()).toMatch(/\.vs-page-header \{[^}]*var\(--vs-page-header-pe, calc\(var\(--vs-space-4\) \+ env\(safe-area-inset-right, 0px\)\)\)/);
  });
});

describe("правки 0.35", async () => {
  const { SidebarLayout } = await import("../src");
  const { allCss } = await import("./css");
  it("SidebarLayout sticky: панель по высоте видимой части экрана, прокрутка не уходит странице", () => {
    const { container } = render(<SidebarLayout sticky sidebar={<div>список</div>}><div>main</div></SidebarLayout>);
    const side = container.querySelector(".vs-sidebar-layout__side--sticky") as HTMLElement;
    expect(side.style.getPropertyValue("--vs-side-max")).toMatch(/px$/);
    expect(allCss()).toMatch(/\.vs-sidebar-layout__side--sticky \{[^}]*max-height: var\(--vs-side-max/);
    expect(allCss()).toMatch(/\.vs-sidebar-layout__side--sticky \{[^}]*overscroll-behavior: contain/);
  });
});

describe("правки 0.36", async () => {
  const fs = await import("node:fs");
  it("место под полосу прокрутки зарезервировано — шапка не сдвигается между короткой и длинной страницей", () => {
    expect(fs.readFileSync(`${__dirname}/../src/styles/base.css`, "utf8")).toMatch(/html \{ scrollbar-gutter: stable; \}/);
  });
});

describe("правки 0.37", async () => {
  const { Tile } = await import("../src");
  it("Tile switcher: переключатель в заголовке, выбор вызывает onChange", () => {
    const picked: string[] = [];
    render(<Tile switcher={{ label: "Что показывать", value: "news", options: [{ value: "mm", label: "Mattermost · 3 в работе" }, { value: "news", label: "Новости" }], onChange: (v) => picked.push(v) }}><p>тело</p></Tile>);
    expect(screen.getByRole("group", { name: "Что показывать" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Mattermost · 3 в работе" }));
    expect(picked).toEqual(["mm"]);
    expect(screen.getByRole("button", { name: "Новости" })).toHaveAttribute("aria-pressed", "true");
  });
});

describe("правки 0.38", async () => {
  const { List, ListRow, Icon } = await import("../src");
  const { allCss } = await import("./css");
  it("List lead=time — ровная колонка мелким кеглем", () => {
    const { container } = render(<List lead="time"><ListRow lead="9:30" title="a" /><ListRow lead={<Icon name="task" size="sm" />} title="b" /></List>);
    expect(container.querySelector(".vs-list--lead-time")).not.toBeNull();
    expect(container.querySelectorAll(".vs-list-row__lead")).toHaveLength(2);
    expect(allCss()).toMatch(/\.vs-list--lead-time \{ --vs-list-lead-w: var\(--vs-space-12\); --vs-list-lead-size: var\(--vs-text-sm\);/);
    expect(allCss()).toMatch(/\.vs-list-row__lead \{[^}]*width: var\(--vs-list-lead-w, auto\)/);
  });
});

describe("правки 0.41", async () => {
  const { allCss } = await import("./css");
  it("lead=time — колонка ближе к названию", () => {
    expect(allCss()).toMatch(/\.vs-list--lead-time \{[^}]*--vs-list-gap: var\(--vs-space-2\)/);
    expect(allCss()).toMatch(/\.vs-list-row__inner \{[^}]*gap: var\(--vs-list-gap, var\(--vs-space-3\)\)/);
  });
});

describe("правки 0.44", async () => {
  const { List, ListRow } = await import("../src");
  const { allCss } = await import("./css");
  it("List lead=icon: колонка по ширине значка, отступ как у lead=time", () => {
    const { container } = render(<List lead="icon"><ListRow lead="✓" title="Забрать посылку" /></List>);
    expect(container.querySelector(".vs-list--lead-icon")).not.toBeNull();
    expect(allCss()).toMatch(/\.vs-list--lead-icon \{ --vs-list-gap: var\(--vs-space-2\); \}/);
    expect(allCss()).not.toMatch(/\.vs-list--lead-icon \{[^}]*--vs-list-lead-w/);
  });
});

describe("правки 0.45", async () => {
  const { allCss } = await import("./css");
  it("двухстрочная строка: колонка слева и название по базовой линии, значок — по центру первой строки", () => {
    expect(allCss()).toMatch(/\.vs-list-row--two \.vs-list-row__lead, \.vs-list-row--two \.vs-list-row__title \{ align-self: baseline; \}/);
    expect(allCss()).toMatch(/\.vs-list--lead-icon \.vs-list-row__lead \{[^}]*height: var\(--vs-leading-md\)/);
  });
});

describe("правки 0.56", async () => {
  const { allCss } = await import("./css");
  it("в киоске строки списка переносятся по словам и слогам, по символам только длинные токены", () => {
    for (const sel of [/\.vs-list-row__title \{[^}]*/, /\.vs-list-row__name, \.vs-list-row__sub \{[^}]*/]) {
      const rule = allCss().match(sel)?.[0] ?? "";
      expect(rule).toMatch(/overflow-wrap: var\(--vs-list-wrap, normal\)/);
      expect(rule).toMatch(/hyphens: var\(--vs-list-hyphens, manual\)/);
      expect(rule).not.toMatch(/word-break/);
    }
    expect(allCss()).toMatch(/(?:^|\n)\.vs-kiosk \{[^}]*--vs-list-wrap: anywhere; --vs-list-hyphens: auto/);
    expect(allCss()).not.toMatch(/break-all/);
  });
});
