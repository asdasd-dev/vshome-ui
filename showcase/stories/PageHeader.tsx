import { useState } from "react";
import { Button, IconButton, PageHeader, Segment, TextField } from "../../src";
import type { StoryFile } from "../catalog";

function WithSearch() {
  const [q, setQ] = useState("");
  const [view, setView] = useState("board");
  return (
    <PageHeader title="Задачи" sub="tasks.vshome.space" actions={<Segment label="Вид" value={view} onChange={setView} options={[{ value: "board", label: "Доска" }, { value: "backlog", label: "Бэклог" }]} />}>
      <TextField label="Поиск" hideLabel type="search" placeholder="T-411, каталог…" value={q} onChange={setQ} />
    </PageHeader>
  );
}

export const meta: StoryFile["meta"] = { title: "PageHeader", group: "Раскладка и навигация", components: ["PageHeader"], doc: "PageHeader" };

export const stories: StoryFile["stories"] = [
  { name: "Заголовок и подзаголовок", render: () => <PageHeader title="Лента" sub="12 новых постов" /> },
  { name: "Назад и действия", render: () => <PageHeader lead={<IconButton icon="arrow-left" label="Назад" />} title="T-411 · Каталог дизайн-системы" sub="Doing · claude-code" actions={<Button size="sm" variant="primary">Апрув</Button>} /> },
  { name: "Строка под заголовком", render: () => <WithSearch /> },
  { name: "Акцентный тон", render: () => <PageHeader tone="accent" title="vshome.space" sub="всё работает" actions={<IconButton icon="search" label="Поиск" />} /> },
];
