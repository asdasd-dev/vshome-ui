import { useState } from "react";
import { Cluster, SplitButton, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Light() {
  const [on, setOn] = useState(true);
  const [sheet, setSheet] = useState(0);
  return (
    <Stack gap="2">
      <Cluster wrap>
        <SplitButton pressed={on} onClick={() => setOn(!on)} more={{ label: "Настройки света", onClick: () => setSheet(sheet + 1) }}>Коридор</SplitButton>
      </Cluster>
      <Text variant="caption" tone="muted">Нажатий на стрелку: {sheet}</Text>
    </Stack>
  );
}

function Scenes() {
  const [scene, setScene] = useState("Ночной");
  const scenes = ["Ночной", "Сон"];
  return (
    <Cluster wrap>
      {scenes.map((s) => (
        <SplitButton key={s} indicator="lamp" pressed={scene === s} onClick={() => setScene(s)} more={{ label: `Состав сцены «${s}»`, onClick: () => undefined }}>{s}</SplitButton>
      ))}
    </Cluster>
  );
}

function Gate() {
  const [last, setLast] = useState("—");
  return (
    <Stack gap="2">
      <Cluster wrap>
        <SplitButton onClick={() => setLast("ворота")} onHold={() => setLast("калитка")} more={{ label: "Камера у ворот", onClick: () => setLast("камера") }}>Ворота</SplitButton>
      </Cluster>
      <Text variant="caption" tone="muted">Открыто: {last}</Text>
    </Stack>
  );
}

export const meta: StoryFile["meta"] = { title: "SplitButton", group: "Действия", components: ["SplitButton"], doc: "SplitButton" };

export const stories: StoryFile["stories"] = [
  { name: "Нажатая и обычная", render: () => <Light /> },
  { name: "Лампа", render: () => <Scenes /> },
  { name: "Удержание", render: () => <Gate /> },
  { name: "Иконки", render: () => <Cluster wrap><SplitButton icon="clock" onClick={() => undefined} more={{ label: "Добавить встречу", icon: "plus", onClick: () => undefined }}>Встречи</SplitButton></Cluster> },
  { name: "Выключенная", render: () => <Cluster wrap><SplitButton disabled onClick={() => undefined} more={{ label: "Настройки света", onClick: () => undefined }}>Двор</SplitButton></Cluster> },
  { name: "В киоске", kiosk: true, render: () => <Stack gap="3"><Light /><Scenes /></Stack> },
];
