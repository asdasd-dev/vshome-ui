import { useState } from "react";
import { Disclosure, KeyValue, List, ListRow, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Tracked() {
  const [open, setOpen] = useState(false);
  return (
    <Stack gap="2">
      <Disclosure summary="Закрытые задачи · 12" onToggle={setOpen}>
        <List>
          <ListRow title="T-398 · Плитка «Музыка» на стене" sub="done" />
          <ListRow title="T-402 · Узел depmap для lenta-tracker" sub="done" />
        </List>
      </Disclosure>
      <Text variant="caption" tone="muted">{open ? "раскрыто" : "свёрнуто"}</Text>
    </Stack>
  );
}

export const meta: StoryFile["meta"] = { title: "Disclosure", group: "Поверхности", components: ["Disclosure"], doc: "Disclosure" };

export const stories: StoryFile["stories"] = [
  {
    name: "Свёрнуто и раскрыто",
    render: () => (
      <Stack gap="3">
        <Disclosure summary="Подробности ошибки"><Text tone="muted">deploy.sh: тесты упали на шаге 2, откат выполнен.</Text></Disclosure>
        <Disclosure summary="Параметры выхода" open>
          <KeyValue items={[{ label: "Страна", value: "Швеция" }, { label: "Задержка", value: "64 мс" }]} />
        </Disclosure>
      </Stack>
    ),
  },
  { name: "Отслеживание раскрытия", render: () => <Tracked /> },
  {
    name: "Приглушённый тон",
    render: () => (
      <Disclosure summary="Показать ещё 5 постов" tone="muted">
        <Text tone="muted">Посты старше недели из Ленты.</Text>
      </Disclosure>
    ),
  },
];
