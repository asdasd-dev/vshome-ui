import { Button, List, ListRow, SectionHeader, Stack } from "../../src";
import type { StoryFile } from "../catalog";

export const meta: StoryFile["meta"] = { title: "SectionHeader", group: "Раскладка и навигация", components: ["SectionHeader"], doc: "SectionHeader" };

export const stories: StoryFile["stories"] = [
  { name: "Заголовок", render: () => <SectionHeader title="Сервисы" /> },
  { name: "Счётчик", render: () => <SectionHeader title="Ждут ревью" count={3} /> },
  { name: "Справа", render: () => <SectionHeader title="Расход" aside="за 7 дней" /> },
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
