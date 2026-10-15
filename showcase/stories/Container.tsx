import { useState } from "react";
import { Card, ChipGroup, Cluster, Container, KeyValue, List, ListRow, Price, SectionHeader, Show, SidebarLayout, Stack, Table, Tag, Text } from "../../src";
import type { StoryFile } from "../catalog";

const tasks = [
  { key: "T-411", title: "Адаптивная раскладка @vshome/ui", status: "Doing", who: "claude-code" },
  { key: "T-402", title: "Плитка Ленты на дашборд", status: "Review", who: "claude-code" },
  { key: "T-398", title: "Ночная сверка карты зависимостей", status: "Inbox", who: "claude.ai" },
];

function Board() {
  const [status, setStatus] = useState("all");
  return (
    <SidebarLayout sticky sidebar={
      <Stack gap="3">
        <SectionHeader as="h3" title="Фильтры" />
        <ChipGroup label="Статус задачи" size="sm" value={status} onChange={setStatus} options={[
          { value: "all", label: "Все", count: 3 },
          { value: "doing", label: "Doing", count: 1 },
          { value: "review", label: "Review", count: 1 },
        ]} />
      </Stack>
    }>
      <Stack gap="2">
        {tasks.map((t) => (
          <Card key={t.key} padding="sm">
            <Stack gap="1"><Text weight="medium">{t.key} · {t.title}</Text><Cluster gap="2"><Tag size="sm">{t.status}</Tag><Text variant="caption" tone="muted">{t.who}</Text></Cluster></Stack>
          </Card>
        ))}
      </Stack>
    </SidebarLayout>
  );
}

function Product() {
  return (
    <SidebarLayout side="end" width="md" sidebarFirst={false} sidebar={
      <Card>
        <Stack gap="2">
          <SectionHeader as="h3" title="Цена" />
          <Price size="lg" value={8999} old={11999} tone="deal" note="по карте" />
          <Text variant="caption" tone="muted">медиана за полгода 109,99 ₽</Text>
        </Stack>
      </Card>
    }>
      <Stack gap="2">
        <Text variant="title" as="h3">Молоко 3,2%, 930 мл</Text>
        <KeyValue size="sm" items={[{ label: "Вес", value: "930 мл" }, { label: "Срок", value: "10 суток" }, { label: "Рейтинг", value: "4,7 ★" }]} cols={3} />
      </Stack>
    </SidebarLayout>
  );
}

export const meta: StoryFile["meta"] = { title: "Container", group: "Раскладка и навигация", components: ["Container", "Show", "SidebarLayout"], doc: "Container" };

export const stories: StoryFile["stories"] = [
  {
    name: "Container: ширина и поля",
    render: () => (
      <Stack gap="3">
        <Container size="sm"><Card><Text>sm · до 720px: форма, статья, настройки</Text></Card></Container>
        <Container size="md"><Card><Text>md · до 1100px: Лента, страница задачи</Text></Card></Container>
        <Container size="full"><Card><Text>full · без предела, только поля --vs-page-gutter: доска задач</Text></Card></Container>
      </Stack>
    ),
  },
  {
    name: "Show: таблица на широком, список на телефоне",
    render: () => (
      <Stack gap="2">
        <Show above="tablet">
          <Table caption="Задачи" rowKey={(r) => r.key} rows={tasks} columns={[
            { key: "key", label: "Задача", nowrap: true },
            { key: "title", label: "Название" },
            { key: "status", label: "Статус", nowrap: true },
            { key: "who", label: "Исполнитель", nowrap: true, muted: true },
          ]} />
        </Show>
        <Show below="tablet">
          <List>{tasks.map((t) => <ListRow key={t.key} lead={t.key} title={t.title} sub={t.who} meta={t.status} />)}</List>
        </Show>
      </Stack>
    ),
  },
  { name: "SidebarLayout: фильтры доски слева", render: () => <Board /> },
  { name: "SidebarLayout: цена справа, на телефоне под товаром", render: () => <Product /> },
];
