import { useState } from "react";
import { Tabs, Text, Stack } from "../../src";
import type { StoryFile } from "../catalog";

function Underline() {
  const [tab, setTab] = useState("doing");
  return (
    <Stack gap="3">
      <Tabs label="Статус задач" value={tab} onChange={setTab} items={[
        { value: "inbox", label: "Inbox", count: 4 },
        { value: "doing", label: "Doing", count: 2 },
        { value: "review", label: "Review", count: 1 },
        { value: "done", label: "Done" },
      ]} />
      <Text tone="muted">Вкладка: {tab}</Text>
    </Stack>
  );
}

function Links() {
  const [tab, setTab] = useState("lenta");
  return (
    <Tabs label="Разделы Ленты" value={tab} onChange={setTab} items={[
      { value: "lenta", label: "Лента", href: "#/c/Tabs" },
      { value: "sources", label: "Источники", href: "#/c/Tabs" },
      { value: "saved", label: "Сохранённое", href: "#/c/Tabs" },
    ]} />
  );
}

function Bottom() {
  const [tab, setTab] = useState("home");
  return (
    <Tabs label="Разделы" variant="bottom" value={tab} onChange={setTab} items={[
      { value: "home", label: "Главная", icon: "clock" },
      { value: "search", label: "Поиск", icon: "search" },
      { value: "info", label: "Сводка", icon: "info", count: 3 },
    ]} />
  );
}

export const meta: StoryFile["meta"] = { title: "Tabs", group: "Раскладка и навигация", components: ["Tabs"], doc: "Tabs" };

export const stories: StoryFile["stories"] = [
  { name: "Подчёркивание и счётчики", render: () => <Underline /> },
  { name: "Ссылки", render: () => <Links /> },
  { name: "Нижняя панель на телефоне", render: () => <Bottom /> },
];
