import { Cluster, EmptyState, Spinner, Text } from "../../src";
import type { StoryFile } from "../catalog";

export const meta: StoryFile["meta"] = { title: "Spinner", group: "Обратная связь", components: ["Spinner"], doc: "Spinner" };

export const stories: StoryFile["stories"] = [
  {
    name: "Размеры",
    render: () => (
      <Cluster gap="4">
        <Spinner size="sm" label="Загрузка" />
        <Spinner label="Загрузка" />
        <Spinner size="lg" label="Загрузка" />
      </Cluster>
    ),
  },
  {
    name: "Рядом с текстом",
    render: () => (
      <Text as="div" tone="muted"><Cluster gap="2"><Spinner size="sm" /><Text tone="muted">Обновляю цены Ленты…</Text></Cluster></Text>
    ),
  },
  {
    name: "Тоны",
    render: () => (
      <Cluster gap="4">
        <Spinner tone="accent" label="Загрузка" />
        <Spinner tone="muted" label="Обновляю в фоне" />
        <Spinner tone="warn" label="Ждёт ответа" />
        <Spinner tone="danger" label="Повторяю запрос" />
      </Cluster>
    ),
  },
  {
    name: "Цвет от родителя",
    render: () => <Text tone="warn"><Spinner label="Ждёт ответа" /></Text>,
  },
  {
    name: "Первая загрузка блока",
    render: () => <EmptyState size="sm" title="Загружаю агентов"><Spinner size="lg" label="Загружаю агентов" /></EmptyState>,
  },
  {
    name: "В киоске",
    kiosk: true,
    render: () => <Text as="div" tone="muted"><Cluster gap="2"><Spinner /><Text tone="muted">Загружаю новости…</Text></Cluster></Text>,
  },
];
