import { useState } from "react";
import { Cluster, IconButton } from "../../src";
import type { StoryFile } from "../catalog";

const slow = (ok: boolean) => () => new Promise<boolean>((r) => setTimeout(() => r(ok), 1500));

function Player() {
  const [playing, setPlaying] = useState(false);
  return (
    <Cluster gap="3">
      <IconButton icon="prev" label="Предыдущий трек" />
      <IconButton icon={playing ? "pause" : "play"} label={playing ? "Пауза" : "Играть"} size="lg" variant="primary" onClick={() => setPlaying(!playing)} />
      <IconButton icon="next" label="Следующий трек" />
    </Cluster>
  );
}

export const meta: StoryFile["meta"] = { title: "IconButton", group: "Действия", components: ["IconButton"], doc: "IconButton" };

export const stories: StoryFile["stories"] = [
  { name: "Варианты", render: () => <Cluster wrap><IconButton icon="close" label="Закрыть" /><IconButton icon="arrow-left" label="Назад" /><IconButton icon="plus" label="Добавить задачу" variant="primary" /><IconButton icon="close" label="Убрать из списка" variant="ghost" /></Cluster> },
  { name: "Размеры", render: () => <Cluster wrap><IconButton icon="search" label="Искать товар" size="sm" /><IconButton icon="search" label="Искать товар" /><IconButton icon="search" label="Искать товар" size="lg" /></Cluster> },
  { name: "Выключенная", render: () => <Cluster wrap><IconButton icon="plus" label="Добавить в список" disabled /><IconButton icon="check" label="Отметить купленным" variant="primary" disabled /></Cluster> },
  { name: "Загрузка", render: () => <Cluster wrap><IconButton icon="check" label="Отметить купленным" loading /><IconButton icon="plus" label="Добавить задачу" variant="primary" loading /></Cluster> },
  { name: "Ждёт ответа", render: () => <Cluster wrap><IconButton icon="next" label="Следующий трек" onClick={slow(true)} /><IconButton icon="heart" label="В любимые (ошибка)" onClick={slow(false)} /></Cluster> },
  { name: "Плеер", render: () => <Player /> },
  { name: "В киоске", kiosk: true, render: () => <Player /> },
];
