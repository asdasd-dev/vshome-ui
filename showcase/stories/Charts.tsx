import { useState } from "react";
import { Segment } from "../../src";
import { ChartCard, LineChart, StackedBars, TimeChart, chartPalette, outageBands } from "../../src/charts";
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

const MONTHS = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const rub = (v: number) => `${v.toFixed(2).replace(".", ",")} ₽`;
const at = (m: number, d: number, h = 12) => Math.floor(new Date(2026, m, d, h).getTime() / 1000);

function Monthly() {
  const labels = ["2026-05-01", "2026-06-01", "2026-07-01", "2026-08-01", "2026-09-01", "2026-10-01"];
  return (
    <ChartCard title="Расходы по месяцам" sub="xFormat подписывает ось месяцами вместо дат"
      legend={[{ name: "Еда", color: chartPalette[2] }, { name: "Подписки", color: chartPalette[1] }]}>
      <StackedBars label="Расходы по месяцам" labels={labels} xFormat={(d) => MONTHS[Number(d.slice(5, 7)) - 1] ?? d} fmt={(v) => `${Math.round(v / 1000)} тыс ₽`}
        series={[{ name: "Еда", color: chartPalette[2], data: [33100, 29800, 35200, 31900, 34400, 31400] }, { name: "Подписки", color: chartPalette[1], data: [3780, 3780, 4980, 4980, 4980, 4980] }]} />
    </ChartCard>
  );
}

function PriceHistory() {
  const points: [number, number][] = [[at(3, 2), 119.99], [at(3, 19), 109.99], [at(4, 8), 119.99], [at(5, 1), 89.99], [at(5, 20), 109.99], [at(6, 15), 114.99], [at(7, 4), 109.99], [at(8, 9), 99.99], [at(8, 27), 119.99], [at(9, 10), 89.99]];
  return (
    <ChartCard title="Молоко 3,2%, 930 мл" sub="цена в Ленте по дням, когда её видели; пунктир — медиана" legend={[{ name: "цена", color: chartPalette[0], extra: "сейчас 89,99 ₽" }]}>
      <TimeChart label="История цены молока за полгода" unit=" ₽" now={at(9, 15)}
        refLines={[{ y: 109.99, label: "медиана 109,99 ₽" }]}
        series={[{ name: "цена", color: chartPalette[0], points, dots: true, fmt: rub }]} />
    </ChartCard>
  );
}

function Bedroom() {
  const points: [number, number][] = Array.from({ length: 48 }, (_, i) => [at(9, 13, 0) + i * 3600, Math.round((21.5 + 1.5 * Math.sin((i - 8) / 3.8)) * 10) / 10]);
  return (
    <ChartCard title="Температура в спальне" sub="двое суток, шкала от минимума данных">
      <TimeChart label="Температура в спальне за двое суток" unit="°" yFrom="data" tipFormat={(t) => new Date(t * 1000).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
        series={[{ name: "спальня", color: chartPalette[1], points, area: true, fmt: (v) => `${String(v).replace(".", ",")} °C` }]} />
    </ChartCard>
  );
}

export const meta: StoryFile["meta"] = { title: "Charts", group: "Графики", components: ["LineChart", "StackedBars", "TimeChart", "ChartCard", "ChartLegend"], doc: "Charts" };

export const stories: StoryFile["stories"] = [
  { name: "Линии с полосами и отметками", render: () => <Latency /> },
  { name: "Редкие точки", render: () => <Sparse /> },
  { name: "Столбики с накоплением и переключатель", render: () => <Spend /> },
  { name: "Столбики по месяцам: xFormat", render: () => <Monthly /> },
  { name: "TimeChart: история цены с медианой", render: () => <PriceHistory /> },
  { name: "TimeChart: заливка и шкала от данных", render: () => <Bedroom /> },
];
