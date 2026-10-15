import { Cluster, List, ListRow, Stack, Tag } from "../../src";
import type { StoryFile } from "../catalog";

export const meta: StoryFile["meta"] = { title: "Tag", group: "Данные", components: ["Tag"], doc: "Tag" };

export const stories: StoryFile["stories"] = [
  {
    name: "Тоны",
    render: () => (
      <Cluster wrap>
        <Tag>РБК</Tag>
        <Tag tone="accent">doing</Tag>
        <Tag tone="ok">в сети</Tag>
        <Tag tone="warn">review</Tag>
        <Tag tone="danger">упал</Tag>
        <Tag tone="muted">архив</Tag>
        <Tag tone="violet">Домлаб</Tag>
        <Tag tone="pink">Отдых</Tag>
        <Tag tone="gold">Обучение</Tag>
      </Cluster>
    ),
  },
  {
    name: "Варианты и размеры",
    render: () => (
      <Stack gap="3">
        <Cluster wrap><Tag tone="ok">оплачено</Tag><Tag tone="ok" variant="outline">оплачено</Tag><Tag tone="danger" variant="outline">просрочено</Tag></Cluster>
        <Cluster wrap align="center"><Tag size="sm" tone="warn">−25%</Tag><Tag tone="warn">−25%</Tag></Cluster>
      </Stack>
    ),
  },
  {
    name: "Длинный текст",
    render: () => (
      <div style={{ width: 200 }}>
        <Tag tone="accent">Перенести бэкапы на новый диск в кладовке</Tag>
      </div>
    ),
  },
  {
    name: "С иконкой",
    render: () => (
      <Cluster wrap>
        <Tag tone="ok" icon="check">VPN в сети</Tag>
        <Tag tone="warn" icon="clock">через 3 мин</Tag>
        <Tag tone="danger" icon="alert">Lama не отвечает</Tag>
      </Cluster>
    ),
  },
  {
    name: "В строках списка",
    render: () => (
      <List label="Доска задач">
        <ListRow title="T-411 Каталог дизайн-системы" meta={<Tag size="sm" tone="accent">doing</Tag>} />
        <ListRow title="T-398 Плитка VPN на дашборде" meta={<Tag size="sm" tone="warn">review</Tag>} />
        <ListRow title="T-402 Перенести бэкапы на новый диск" meta={<Tag size="sm">inbox</Tag>} />
      </List>
    ),
  },
];
