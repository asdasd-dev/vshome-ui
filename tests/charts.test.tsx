import { fireEvent, render, screen } from "@testing-library/react";
import { ChartCard, LineChart, StackedBars, TimeChart } from "../src/charts";
import { PAD } from "../src/charts/useChartFrame";

const t0 = new Date(2026, 9, 1, 0, 0).getTime() / 1000;

function svgRect(svg: SVGSVGElement, width: number) {
  svg.getBoundingClientRect = () => ({ left: 0, top: 0, width, height: 170, right: width, bottom: 170, x: 0, y: 0, toJSON() {} });
}

describe("LineChart", () => {
  it("на сенсорном экране подсказка над графиком во всю ширину, а не поверх линий", () => {
    const prev = window.matchMedia;
    window.matchMedia = ((q: string) => ({ media: q, matches: q.includes("pointer: coarse"), addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false })) as unknown as typeof window.matchMedia;
    try {
      const { container } = render(<LineChart t0={t0} step={3600} series={[{ name: "a", color: "#f00", data: [1, 2, 3, 4, 5] }]} />);
      const svg = container.querySelector("svg")!;
      svgRect(svg, Number(svg.getAttribute("width")));
      fireEvent.mouseMove(svg.lastElementChild!, { clientX: 200 });
      const tip = container.querySelector(".vs-chart-tip") as HTMLElement;
      expect(tip.hidden).toBe(false);
      expect(tip.style.left).toBe("0px");
    } finally {
      window.matchMedia = prev;
    }
    const css = require("node:fs").readFileSync(require("node:path").join(__dirname, "..", "src", "charts", "charts.css"), "utf8");
    expect(css).toMatch(/@media \(pointer: coarse\) \{ \.vs-chart-tip \{[^}]*bottom: calc\(100% \+ var\(--vs-space-1\)\)/);
  });

  it("рисует ряд внутри ширины графика, null рвёт линию", () => {
    const { container } = render(<LineChart t0={t0} step={3600} series={[{ name: "a", color: "#f00", data: [1, 2, null, 4, 5] }]} />);
    const svg = container.querySelector("svg")!;
    const W = Number(svg.getAttribute("width"));
    const d = container.querySelector("path")!.getAttribute("d")!;
    expect(d.match(/M/g)).toHaveLength(2);
    const xs = [...d.matchAll(/[ML]([\d.]+)/g)].map((m) => Number(m[1]));
    expect(Math.max(...xs)).toBeLessThanOrEqual(W);
  });

  it("одиночная точка между пропусками — маркер", () => {
    const { container } = render(<LineChart t0={t0} step={3600} series={[{ name: "a", color: "#f00", data: [null, 3, null] }]} />);
    expect(container.querySelectorAll("circle")).toHaveLength(1);
  });

  it("полосы и подсказка: время, значения с fmt, подпись полосы, note", () => {
    const { container } = render(
      <LineChart t0={t0} step={3600} bands={[[1, 2]]} bandLabel="VPN не работал" note={(i) => `заметка ${i}`}
        series={[{ name: "задержка", color: "#f00", data: [10, 20, 30, 40, 50], fmt: (v) => `${v} мс` }]} />,
    );
    expect(container.querySelectorAll(".vs-chart-band")).toHaveLength(1);
    const svg = container.querySelector("svg")!;
    svgRect(svg, Number(svg.getAttribute("width")));
    const W = Number(svg.getAttribute("width"));
    const x1 = 40 + (W - 52) * 0.25;
    fireEvent.mouseMove(svg.lastElementChild!, { clientX: x1 });
    const tip = container.querySelector(".vs-chart-tip") as HTMLElement;
    expect(tip.hidden).toBe(false);
    expect(tip.textContent).toContain("01.10 01:00");
    expect(tip.textContent).toContain("задержка: 20 мс");
    expect(tip.textContent).toContain("VPN не работал");
    expect(tip.textContent).toContain("заметка 1");
    fireEvent.mouseLeave(svg.lastElementChild!);
    expect(tip.hidden).toBe(true);
  });

  it("connect: подсказка прилипает к ближайшему замеру", () => {
    const { container } = render(<LineChart t0={t0} step={3600} connect series={[{ name: "a", color: "#f00", data: [null, null, null, 7, null] }]} />);
    const svg = container.querySelector("svg")!;
    svgRect(svg, Number(svg.getAttribute("width")));
    fireEvent.mouseMove(svg.lastElementChild!, { clientX: 45 });
    expect(container.querySelector(".vs-chart-tip")!.textContent).toContain("a: 7");
  });

  it("метки выкаток и перезапусков в подсказке", () => {
    const { container } = render(<LineChart t0={t0} step={3600} marks={[{ i: 0, label: "abc123" }, { i: 1, dashed: true, label: "рестарт" }]} series={[{ name: "a", color: "#f00", data: [1, 2, 3] }]} />);
    expect(container.querySelector(".vs-chart-mark")).not.toBeNull();
    expect(container.querySelector(".vs-chart-restart")).not.toBeNull();
    const svg = container.querySelector("svg")!;
    svgRect(svg, Number(svg.getAttribute("width")));
    fireEvent.mouseMove(svg.lastElementChild!, { clientX: 41 });
    const t = container.querySelector(".vs-chart-tip")!.textContent!;
    expect(t).toContain("🚀 abc123");
    expect(t).toContain("↻ рестарт");
  });

  it("hidden: скрытый ряд не рисуется и не влияет на шкалу", () => {
    const { container } = render(<LineChart t0={t0} step={3600} hidden={["b"]}
      series={[{ name: "a", color: "#f00", data: [1, 2, 3] }, { name: "b", color: "#00f", data: [100, 200, 300] }]} />);
    expect(container.querySelectorAll("path[stroke='#00f']")).toHaveLength(0);
    expect(container.querySelectorAll("path[stroke='#f00']")).toHaveLength(1);
    const axis = [...container.querySelectorAll("text")].map((t) => Number(t.textContent));
    expect(Math.max(...axis.filter((v) => !Number.isNaN(v)))).toBeLessThan(10);
  });

  it("robust: выброс упирается в верх и отмечен", () => {
    const data = [...Array.from({ length: 20 }, (_, i) => 10 + i), 2000];
    const { container } = render(<LineChart t0={t0} step={3600} robust series={[{ name: "a", color: "#f00", data }]} />);
    const axis = [...container.querySelectorAll("text")].map((t) => t.textContent);
    expect(axis).toContain("40");
    expect(container.querySelectorAll(".vs-chart-clip")).toHaveLength(1);
  });

  it("короткий период — метки часов", () => {
    const start = new Date(2026, 9, 1, 12, 0).getTime() / 1000;
    const { container } = render(<LineChart t0={start} step={600} series={[{ name: "a", color: "#f00", data: Array(37).fill(1) }]} />);
    const labels = [...container.querySelectorAll("text")].map((t) => t.textContent).filter((t) => /^\d\d:\d\d$/.test(t!));
    expect(labels).toEqual(["12:00", "15:00", "18:00"]);
  });

  it("метки дней — полуночи", () => {
    const { container } = render(<LineChart t0={t0} step={43200} series={[{ name: "a", color: "#f00", data: [1, 2, 3, 4] }]} />);
    const labels = [...container.querySelectorAll("text")].map((t) => t.textContent).filter((t) => /\d\d\.\d\d/.test(t!));
    expect(labels).toEqual(["01.10", "02.10"]);
  });
});

describe("StackedBars", () => {
  it("столбики с накоплением и подсказка с суммой", () => {
    const { container } = render(
      <StackedBars labels={["2026-10-01", "2026-10-02"]} fmt={(v) => `$${v}`}
        series={[{ name: "Мак", color: "#00f", data: [1, 2] }, { name: "бокс", color: "#f00", data: [3, 0] }]} />,
    );
    expect(container.querySelectorAll("svg path, svg rect[fill='#00f'], svg rect[fill='#f00']").length).toBe(3);
    const svg = container.querySelector("svg")!;
    svgRect(svg, Number(svg.getAttribute("width")));
    const hits = container.querySelectorAll("svg rect[fill='transparent']");
    fireEvent.mouseMove(hits[0]!);
    const t = container.querySelector(".vs-chart-tip")!.textContent!;
    expect(t).toContain("01.10 — $4");
    expect(t).toContain("бокс: $3");
  });
});

describe("ChartCard", () => {
  it("onToggle: пункты легенды — кнопки, скрытый не нажат", () => {
    const toggled: string[] = [];
    render(<ChartCard title="Задержка" hidden={["b"]} onToggle={(n) => toggled.push(n)}
      legend={[{ name: "a", color: "#f00" }, { name: "b", color: "#00f" }]} />);
    const a = screen.getByRole("button", { name: /a/ }), b = screen.getByRole("button", { name: /b/ });
    expect(a.getAttribute("aria-pressed")).toBe("true");
    expect(b.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(b);
    expect(toggled).toEqual(["b"]);
  });

  it("заголовок, подзаголовок, легенда с пометкой", () => {
    render(<ChartCard title="Диск" sub="растёт" legend={[{ name: "занято", color: "#f00", extra: "доступен 99%" }]} />);
    expect(screen.getByText("Диск")).toBeInTheDocument();
    expect(screen.getByText("растёт")).toBeInTheDocument();
    expect(screen.getByText("доступен 99%").tagName).toBe("EM");
  });
});

describe("TimeChart", () => {
  const yLabels = (c: HTMLElement) => [...c.querySelectorAll("text.vs-chart-axis")].filter((t) => t.getAttribute("x") === String(PAD.L - 6)).map((t) => Number(t.textContent));

  it("деления оси Y круглые: каждое кратно шагу сетки", () => {
    const { container } = render(<TimeChart yFrom="data" series={[{ name: "цена", color: "#f00", points: [[1, 140], [2, 240]] }]} />);
    const ys = yLabels(container);
    expect(ys.length).toBeGreaterThanOrEqual(3);
    expect(ys.filter((v) => v % 25 !== 0)).toEqual([]);
    expect(Math.min(...ys)).toBeLessThanOrEqual(140);
    expect(Math.max(...ys)).toBeGreaterThanOrEqual(240);
  });

  it("точка-событие попадает в подсказку только рядом с собой, у каждого значения маркер на графике", () => {
    const { container } = render(<TimeChart series={[{ name: "цена", color: "#f00", points: [[0, 10], [100, 20]] }, { name: "мои покупки", color: "#00f", dots: true, points: [[0, 12]] }]} />);
    const svg = container.querySelector("svg")!;
    const W = Number(svg.getAttribute("width"));
    svgRect(svg, W);
    const tip = container.querySelector(".vs-chart-tip")!;
    fireEvent.mouseMove(svg.lastElementChild!, { clientX: W - PAD.R });
    expect(tip.textContent).toContain("цена: 20");
    expect(tip.textContent).not.toContain("мои покупки");
    expect(svg.querySelectorAll("circle.vs-chart-dot")).toHaveLength(1);
    fireEvent.mouseMove(svg.lastElementChild!, { clientX: PAD.L });
    expect(tip.textContent).toContain("мои покупки: 12");
    expect(svg.querySelectorAll("circle.vs-chart-dot")).toHaveLength(2);
  });
});
