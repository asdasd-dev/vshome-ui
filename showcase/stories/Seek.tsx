import { useEffect, useState } from "react";
import { Seek, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Track() {
  const [pos, setPos] = useState(86);
  useEffect(() => {
    const t = setInterval(() => setPos((p) => (p + 1) % 263), 1000);
    return () => clearInterval(t);
  }, []);
  return <Seek label="Перемотка трека" value={pos} max={263} onCommit={setPos} />;
}

function Committed() {
  const [v, setV] = useState(1800);
  return (
    <Stack gap="2">
      <Seek label="Перемотка подкаста" value={v} max={5400} onCommit={setV} />
      <Text variant="caption" tone="muted">Отправлено: {v} с</Text>
    </Stack>
  );
}

export const meta: StoryFile["meta"] = { title: "Seek", group: "Выбор и ввод", components: ["Seek"], doc: "Seek" };

export const stories: StoryFile["stories"] = [
  { name: "Трек идёт", render: () => <div style={{ width: 320 }}><Track /></div> },
  { name: "Больше часа", render: () => <div style={{ width: 320 }}><Committed /></div> },
  { name: "Выключенная", render: () => <div style={{ width: 320 }}><Seek label="Перемотка" value={40} max={200} onCommit={() => undefined} disabled /></div> },
  { name: "В киоске", kiosk: true, render: () => <div style={{ width: 360 }}><Track /></div> },
];
