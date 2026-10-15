import { useState } from "react";
import { RangeSlider, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Discount() {
  const [range, setRange] = useState<[number, number]>([20, 50]);
  return (
    <Stack gap="2">
      <Text variant="caption" tone="muted">Скидка {range[0]}–{range[1]}%</Text>
      <RangeSlider label="Скидка" value={range} min={0} max={90} step={5} format={(v) => `${v}%`} onCommit={(lo, hi) => setRange([lo, hi])} />
    </Stack>
  );
}

function Rating() {
  const [range, setRange] = useState<[number, number]>([4, 5]);
  const fmt = (v: number) => `${v.toFixed(1).replace(".", ",")} ★`;
  return (
    <Stack gap="2">
      <Text variant="caption" tone="muted">Рейтинг <Text variant="caption" tone="gold">{fmt(range[0])}</Text> – <Text variant="caption" tone="gold">{fmt(range[1])}</Text></Text>
      <RangeSlider label="Рейтинг товара" value={range} min={1} max={5} step={0.1} tone="gold" format={fmt} onCommit={(lo, hi) => setRange([lo, hi])} />
    </Stack>
  );
}

export const meta: StoryFile["meta"] = { title: "RangeSlider", group: "Выбор и ввод", components: ["RangeSlider"], doc: "RangeSlider" };

export const stories: StoryFile["stories"] = [
  { name: "Скидка от и до", render: () => <Discount /> },
  { name: "Рейтинг, тон gold", render: () => <Rating /> },
  { name: "Выключенный", render: () => <RangeSlider label="Цена за кг" value={[100, 400]} min={0} max={1000} step={10} disabled onCommit={() => undefined} /> },
];
