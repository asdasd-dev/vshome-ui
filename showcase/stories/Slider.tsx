import { useState } from "react";
import { Slider, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Brightness() {
  const [v, setV] = useState(60);
  return (
    <Stack gap="2">
      <Slider label="Яркость света в коридоре" value={v} onCommit={setV} format={(x) => `${x}%`} />
      <Text variant="caption" tone="muted">Отправлено: {v}%</Text>
    </Stack>
  );
}

function Thermostat() {
  const [t, setT] = useState(22);
  return <Slider label="Температура в спальне" value={t} min={16} max={28} step={0.5} onCommit={setT} format={(x) => `${x.toFixed(1)} °C`} />;
}

function Volume() {
  const [v, setV] = useState(0);
  return <Slider label="Громкость колонки на кухне" value={v} min={0} max={100} onCommit={setV} format={(x) => (x === 0 ? "Без звука" : String(x))} />;
}

export const meta: StoryFile["meta"] = { title: "Slider", group: "Выбор и ввод", components: ["Slider"], doc: "Slider" };

export const stories: StoryFile["stories"] = [
  { name: "Проценты", render: () => <Brightness /> },
  { name: "Шаг и единицы", render: () => <Thermostat /> },
  { name: "Шкала от нуля", render: () => <Volume /> },
  { name: "С иконкой", render: () => <Slider label="Громкость Spotify" value={62} min={0} max={100} icon="volume" onCommit={() => undefined} format={(x) => `${x}%`} /> },
  { name: "Тонкая линия", kiosk: true, render: () => <div style={{ width: 320 }}><Slider variant="line" label="Громкость Spotify" value={62} min={0} max={100} icon="volume" onCommit={() => undefined} format={(x) => `${x}%`} /></div> },
  { name: "Выключенный", render: () => <Slider label="Яркость света на кухне" value={40} onCommit={() => undefined} format={(x) => `${x}%`} disabled /> },
  { name: "В киоске", kiosk: true, render: () => <Stack gap="3"><Brightness /><Thermostat /></Stack> },
];
