import { useState } from "react";
import { Button, ControlList, ControlRow, Segment, Slider, Switch, Text, Tile } from "../../src";
import type { StoryFile } from "../catalog";

function Settings() {
  const [night, setNight] = useState(true);
  const [sound, setSound] = useState(false);
  const [mode, setMode] = useState("auto");
  return (
    <ControlList>
      <ControlRow label="Ночной режим стены" control={<Switch label="Ночной режим стены" checked={night} onChange={setNight} />} />
      <ControlRow label="Звук уведомлений" control={<Switch label="Звук уведомлений" checked={sound} onChange={setSound} />} />
      <ControlRow label="Тема" control={<Segment label="Тема" value={mode} onChange={setMode} options={[{ value: "auto", label: "Авто" }, { value: "light", label: "Светлая" }, { value: "dark", label: "Тёмная" }]} />} />
    </ControlList>
  );
}

function WithExtra() {
  const [on, setOn] = useState(true);
  const [level, setLevel] = useState(70);
  return (
    <ControlList>
      <ControlRow label="Большая лента" control={<Switch label="Большая лента" checked={on} onChange={setOn} />}>
        {on && <Slider label="Большая лента: яркость" value={level} onCommit={setLevel} format={(v) => `${v}%`} />}
      </ControlRow>
      <ControlRow label={<Text>Кухня · <Text tone="muted">2 лампы</Text></Text>} control={<Button size="sm">Открыть</Button>} />
    </ControlList>
  );
}

function InTile() {
  const [bania, setBania] = useState(false);
  return (
    <div style={{ width: 320 }}>
      <Tile label="Свет">
        <ControlList>
          <ControlRow label="Баня" control={<Switch label="Баня" checked={bania} onChange={setBania} />} />
          <ControlRow label="Коридор" control={<Switch label="Коридор" checked onChange={() => {}} />} />
        </ControlList>
      </Tile>
    </div>
  );
}

export const meta: StoryFile["meta"] = { title: "ControlList", group: "Раскладка и навигация", components: ["ControlList", "ControlRow"], doc: "ControlList" };

export const stories: StoryFile["stories"] = [
  { name: "Настройки", render: () => <Settings /> },
  { name: "Строка с дополнением", render: () => <WithExtra /> },
  { name: "В киоске", kiosk: true, render: () => <InTile /> },
];
