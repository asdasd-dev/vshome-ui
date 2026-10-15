import { Button, List, ListRow, SectionHeader, Stack } from "../../src";
import type { StoryFile } from "../catalog";

export const meta: StoryFile["meta"] = { title: "SectionHeader", group: "Раскладка и навигация", components: ["SectionHeader"], doc: "SectionHeader" };

export const stories: StoryFile["stories"] = [
  { name: "Заголовок", render: () => <SectionHeader title="Сервисы" /> },
  { name: "Счётчик", render: () => <SectionHeader title="Ждут ревью" count={3} /> },
  { name: "Справа", render: () => <SectionHeader title="Расход" aside="за 7 дней" /> },
  {
    name: "Счётчик-строка и тон: лимит колонки",
    render: () => (
      <Stack gap="3">
        <SectionHeader as="h3" title="Doing" count="2/3" countLabel="2 задачи при лимите 3" />
        <SectionHeader as="h3" title="Review" count="3/3" countTone="warn" countLabel="3 задачи, лимит достигнут" />
        <SectionHeader as="h3" title="To do" count="8/7" countTone="danger" countLabel="8 задач при лимите 7" />
        <SectionHeader as="h3" title="Ждут ревью" count={3} countTone="accent" />
      </Stack>
    ),
  },
  {
    name: "Над списком с действием",
    render: () => (
      <Stack gap="2">
        <SectionHeader as="h3" title="Inbox" count={2} aside={<Button size="sm" variant="ghost">Все</Button>} />
        <List>
          <ListRow title="T-412 · Плитка погоды" sub="claude-code" />
          <ListRow title="T-413 · Узел depmap" sub="claude.ai" />
        </List>
      </Stack>
    ),
  },
];
