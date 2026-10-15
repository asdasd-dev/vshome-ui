import { useState } from "react";
import { Segment } from "../../src";
import { ChartCard, LineChart, StackedBars, chartPalette, outageBands } from "../../src/charts";
import type { StoryFile } from "../catalog";

const T0 = Math.floor(new Date(2026, 9, 1).getTime() / 1000);
const wave = (k: number) => Array.from({ length: 96 }, (_, i) => (i > 40 && i < 46 ? null : Math.round(60 + 30 * Math.sin(i / 8 + k) + k * 15)));
const alive = Array.from({ length: 96 }, (_, i) => (i > 60 && i < 66 ? 0 : 1));
const ms = (v: number) => `${v} мс`;
const usd = (v: number) => `$${Math.round(v)}`;
const days = ["2026-10-01", "2026-10-02", "2026-10-03", "2026-10-04", "2026-10-05", "2026-10-06", "2026-10-07"];

function Latency() {
  return (
    <ChartCard title="Задержка выходов VPN" sub="полосы — VPN не работал, линия рвётся на пропусках"
      legend={[{ name: "Швеция", color: chartPalette[0] }, { name: "Германия", color: chartPalette[2], extra: "доступен 97%" }]}>
      <LineChart label="Задержка выходов VPN за двое суток" t0={T0} step={1800} unit=" мс" bands={outageBands(alive)} bandLabel="VPN не работал"
        marks={[{ i: 30, label: "выкатка abc123" }, { i: 70, dashed: true, label: "перезапуск sing-box" }]}
        series={[{ name: "Швеция", color: chartPalette[0], data: wave(0), fmt: ms }, { name: "Германия", color: chartPalette[2], data: wave(1), fmt: ms }]} />
    </ChartCard>
  );
}

function Sparse() {
  const data = Array.from({ length: 48 }, (_, i) => (i % 6 === 0 ? 40 + (i % 18) : null));
  return (
    <ChartCard title="Время ночного синка" sub="одна точка раз в 3 часа, connect соединяет через пропуски">
      <LineChart label="Время ночного синка" t0={T0} step={1800} unit=" с" connect series={[{ name: "синк", color: chartPalette[3], data, fmt: (v) => `${v} с` }]} />
    </ChartCard>
  );
}

function Spend() {
  const [period, setPeriod] = useState("7");
  const shown = period === "7" ? days : days.slice(-3);
  const mac = [12, 30, 8, 22, 17, 5, 26].slice(-shown.length);
  const box = [5, 0, 14, 9, 11, 20, 3].slice(-shown.length);
  return (
    <ChartCard title="Расход по дням" sub="Claude Code, Мак и бокс"
      extra={<Segment label="Период" value={period} onChange={setPeriod} options={[{ value: "7", label: "7 дней" }, { value: "3", label: "3 дня" }]} />}
      legend={[{ name: "Мак", color: chartPalette[0] }, { name: "бокс", color: chartPalette[1] }]}>
      <StackedBars label="Расход Claude Code по дням" labels={shown} fmt={usd} series={[{ name: "Мак", color: chartPalette[0], data: mac }, { name: "бокс", color: chartPalette[1], data: box }]} />
    </ChartCard>
  );
}

export const meta: StoryFile["meta"] = { title: "Charts", group: "Графики", components: ["LineChart", "StackedBars", "ChartCard", "ChartLegend"], doc: "Charts" };

export const stories: StoryFile["stories"] = [
  { name: "Линии с полосами и отметками", render: () => <Latency /> },
  { name: "Редкие точки", render: () => <Sparse /> },
  { name: "Столбики с накоплением и переключатель", render: () => <Spend /> },
];
