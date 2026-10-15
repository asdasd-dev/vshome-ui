import { useState } from "react";
import { Badge, Card, Cluster, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Clickable() {
  const [opened, setOpened] = useState(0);
  return (
    <Stack gap="2">
      <Card onClick={() => setOpened(opened + 1)} stripe="warn">
        <Stack as="span" gap="1">
          <Text variant="title">T-121 · Каталог дизайн-системы</Text>
          <Text tone="muted">Review · claude-code</Text>
        </Stack>
      </Card>
      <Text variant="caption" tone="muted">Открыто карточек: {opened}</Text>
    </Stack>
  );
}

function Folder() {
  const [open, setOpen] = useState(false);
  return (
    <Stack gap="2">
      <Card onClick={() => setOpen(!open)} expanded={open} controls="media-folder" label={`${open ? "Свернуть" : "Открыть"} папку Медиа, 3 сервиса`}>
        <Cluster as="span" justify="between"><Text weight="medium">Медиа</Text><Badge tone="muted">3</Badge></Cluster>
      </Card>
      <div id="media-folder" hidden={!open}>
        <Stack gap="2">
          {["Jellyfin", "Фото", "Музыка"].map((s) => <Card key={s} padding="sm"><Text>{s}</Text></Card>)}
        </Stack>
      </div>
    </Stack>
  );
}

export const meta: StoryFile["meta"] = { title: "Card", group: "Поверхности", components: ["Card"], doc: "Card" };

export const stories: StoryFile["stories"] = [
  {
    name: "Тона",
    render: () => (
      <Stack gap="2">
        <Card><Text>default · обычная карточка доски</Text></Card>
        <Card tone="accent"><Text>accent · выбранная задача</Text></Card>
        <Card tone="ok"><Text>ok · деплой прошёл</Text></Card>
        <Card tone="warn"><Text>warn · ждёт ответа</Text></Card>
        <Card tone="danger"><Text>danger · автодеплой упал</Text></Card>
        <Card tone="muted"><Text>muted · закрытая задача</Text></Card>
        <Card tone="violet"><Text>violet · Домлаб</Text></Card>
        <Card tone="pink"><Text>pink · Отдых</Text></Card>
        <Card tone="gold"><Text>gold · Обучение</Text></Card>
      </Stack>
    ),
  },
  {
    name: "Полоса слева",
    render: () => (
      <Stack gap="2">
        <Card stripe="accent"><Cluster justify="between"><Text>personalai</Text><Badge tone="muted">3</Badge></Cluster></Card>
        <Card stripe="violet"><Cluster justify="between"><Text>monitoring</Text><Badge tone="muted">1</Badge></Cluster></Card>
        <Card stripe="#199e70"><Cluster justify="between"><Text>lenta-tracker</Text><Badge tone="muted">5</Badge></Cluster></Card>
      </Stack>
    ),
  },
  {
    name: "Отступы и тень",
    render: () => (
      <Cluster wrap align="start" gap="4">
        <Card padding="sm"><Text>padding sm</Text></Card>
        <Card><Text>padding md</Text></Card>
        <Card padding="lg"><Text>padding lg</Text></Card>
        <Card elevated><Text>elevated</Text></Card>
      </Cluster>
    ),
  },
  { name: "Клик", render: () => <Clickable /> },
  { name: "Раскрывает блок: expanded и controls", render: () => <Folder /> },
  {
    name: "Внешняя ссылка",
    render: () => (
      <Card href="https://grafana.vshome.space" external stripe="violet">
        <Stack as="span" gap="1"><Text weight="medium">Мониторинг</Text><Text variant="caption" tone="muted">grafana.vshome.space · откроется в новой вкладке</Text></Stack>
      </Card>
    ),
  },
  {
    name: "Ссылка",
    render: () => (
      <Card href="#/c/Card" title="Открыть пост в Ленте">
        <Stack as="span" gap="1">
          <Text variant="title">Ритм заводов · неделя 41</Text>
          <Text tone="muted" lines={2}>Главные новости предприятий за неделю: запуск линии, новый заказ, итоги квартала.</Text>
        </Stack>
      </Card>
    ),
  },
];
