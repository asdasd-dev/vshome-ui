import { useState } from "react";
import { Cluster, ControlList, ControlRow, Icon, Switch } from "../../src";
import type { StoryFile } from "../catalog";

function Rows() {
  const [light, setLight] = useState(true);
  const [floor, setFloor] = useState(false);
  return (
    <ControlList>
      <ControlRow label="Свет в коридоре" control={<Switch label="Свет в коридоре" checked={light} onChange={setLight} />} />
      <ControlRow label="Подогрев пола" control={<Switch label="Подогрев пола" checked={floor} onChange={setFloor} />} />
      <ControlRow label="Автополив" control={<Switch label="Автополив" checked={false} onChange={() => undefined} disabled title="Нет связи с контроллером" />} />
    </ControlList>
  );
}

function Sizes() {
  const [md, setMd] = useState(true);
  const [sm, setSm] = useState(true);
  return (
    <Cluster gap="4">
      <Switch label="Уведомления о встречах" checked={md} onChange={setMd} />
      <Switch label="Показывать архив" size="sm" checked={sm} onChange={setSm} />
    </Cluster>
  );
}

function WithIcon() {
  const [night, setNight] = useState(false);
  return <Switch label="Ночной режим" icon={<Icon name="weather-clear-night" size="sm" />} checked={night} onChange={setNight} />;
}

export const meta: StoryFile["meta"] = { title: "Switch", group: "Выбор и ввод", components: ["Switch"], doc: "Switch" };

export const stories: StoryFile["stories"] = [
  { name: "В строках настроек", render: () => <Rows /> },
  { name: "Размеры", render: () => <Sizes /> },
  { name: "С иконкой", render: () => <WithIcon /> },
  { name: "В киоске", kiosk: true, render: () => <Rows /> },
];
