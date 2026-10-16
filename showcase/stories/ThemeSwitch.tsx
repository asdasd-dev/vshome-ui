import { useState } from "react";
import { PageHeader, Stack, Text, ThemeSwitch, type ThemeChoice } from "../../src";
import type { StoryFile } from "../catalog";

function Local({ variant }: { variant?: "segment" | "button" }) {
  const [v, setV] = useState<ThemeChoice>("light");
  return <Stack gap="2"><ThemeSwitch variant={variant} value={v} onChange={setV} /><Text variant="caption" tone="muted">Выбрано: {v}</Text></Stack>;
}

function InHeader() {
  const [v, setV] = useState<ThemeChoice>("system");
  return <PageHeader tone="accent" title="Лента на Будённого" sub="Цены на 15 октября" actions={<ThemeSwitch value={v} onChange={setV} />} />;
}

export const meta: StoryFile["meta"] = { title: "ThemeSwitch", group: "Выбор и ввод", components: ["ThemeSwitch"], doc: "ThemeSwitch" };

export const stories: StoryFile["stories"] = [
  { name: "Сегмент", render: () => <Local /> },
  { name: "Кнопка по кругу", render: () => <Local variant="button" /> },
  { name: "В акцентной шапке", render: () => <InHeader /> },
];
