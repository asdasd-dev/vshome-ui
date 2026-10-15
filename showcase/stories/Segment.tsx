import { useRef, useState } from "react";
import { Card, Icon, Segment, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Period({ variant, size, noMonth }: { variant?: "default" | "soft"; size?: "sm" | "md"; noMonth?: boolean }) {
  const [period, setPeriod] = useState<"day" | "week" | "month">("week");
  return (
    <Segment label="Период графика" variant={variant} size={size} value={period} onChange={setPeriod} options={[
      { value: "day", label: "День" },
      { value: "week", label: "Неделя" },
      { value: "month", label: "Месяц", disabled: noMonth },
    ]} />
  );
}

function Zone() {
  const [zone, setZone] = useState<"home" | "yard">("home");
  return (
    <Segment label="Зона" variant="soft" value={zone} onChange={setZone} options={[
      { value: "home", label: "Дом" },
      { value: "yard", label: "Двор" },
    ]} />
  );
}

function Weather() {
  const [mode, setMode] = useState<"day" | "night">("day");
  return (
    <Segment label="Прогноз" value={mode} onChange={setMode} options={[
      { value: "day", label: <><Icon name="weather-sunny" size="sm" />Днём</> },
      { value: "night", label: <><Icon name="weather-clear-night" size="sm" />Ночью</> },
    ]} />
  );
}

function Scroller() {
  const cols = ["inbox", "doing", "review"] as const;
  const [pos, setPos] = useState(0);
  const board = useRef<HTMLDivElement>(null);
  const value = cols[Math.round(pos)]!;
  return (
    <div style={{ maxWidth: 360 }}>
    <Stack gap="2">
      <Segment label="Колонка доски" value={value} onChange={(v) => board.current?.scrollTo({ left: cols.indexOf(v) * board.current.clientWidth, behavior: "smooth" })} progress={pos} options={[
        { value: "inbox", label: "Inbox" },
        { value: "doing", label: "Doing" },
        { value: "review", label: "Review" },
      ]} />
      <div ref={board} style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory" }} onScroll={(e) => setPos(e.currentTarget.scrollLeft / e.currentTarget.clientWidth)}>
        {cols.map((c) => <div key={c} style={{ flex: "0 0 100%", scrollSnapAlign: "start" }}><Card><Text>Колонка {c}: листайте вбок</Text></Card></div>)}
      </div>
    </Stack>
    </div>
  );
}

export const meta: StoryFile["meta"] = { title: "Segment", group: "Выбор и ввод", components: ["Segment"], doc: "Segment" };

export const stories: StoryFile["stories"] = [
  { name: "Обычный", render: () => <Period /> },
  { name: "Мягкий", render: () => <Stack gap="3" align="start"><Period variant="soft" /><Zone /></Stack> },
  { name: "Маленький", render: () => <Stack gap="3" align="start"><Period size="sm" /><Period size="sm" variant="soft" /></Stack> },
  { name: "Выключенный вариант", render: () => <Period noMonth /> },
  { name: "С иконками", render: () => <Weather /> },
  { name: "Ползунок по прокрутке: progress", render: () => <Scroller /> },
  { name: "В киоске", kiosk: true, render: () => <Stack gap="3" align="start"><Zone /><Period /></Stack> },
];
