import { useState } from "react";
import { Icon, Segment, Stack } from "../../src";
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

export const meta: StoryFile["meta"] = { title: "Segment", group: "Выбор и ввод", components: ["Segment"], doc: "Segment" };

export const stories: StoryFile["stories"] = [
  { name: "Обычный", render: () => <Period /> },
  { name: "Мягкий", render: () => <Stack gap="3" align="start"><Period variant="soft" /><Zone /></Stack> },
  { name: "Маленький", render: () => <Stack gap="3" align="start"><Period size="sm" /><Period size="sm" variant="soft" /></Stack> },
  { name: "Выключенный вариант", render: () => <Period noMonth /> },
  { name: "С иконками", render: () => <Weather /> },
  { name: "В киоске", kiosk: true, render: () => <Stack gap="3" align="start"><Zone /><Period /></Stack> },
];
