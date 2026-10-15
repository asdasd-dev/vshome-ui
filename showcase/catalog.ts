import type { ReactNode } from "react";

export type Group = "Действия" | "Выбор и ввод" | "Данные" | "Обратная связь" | "Поверхности" | "Раскладка и навигация" | "Текст и медиа" | "Графики";

export const GROUPS: Group[] = ["Действия", "Выбор и ввод", "Данные", "Обратная связь", "Поверхности", "Раскладка и навигация", "Текст и медиа", "Графики"];

export type Story = { name: string; render: () => ReactNode; kiosk?: boolean };

export type StoryMeta = { title: string; group: Group; components: string[]; doc: string };

export type StoryFile = { meta: StoryMeta; stories: Story[] };

const storyModules = import.meta.glob<StoryFile>("./stories/*.tsx", { eager: true });
const docModules = import.meta.glob<string>("../docs/**/*.md", { query: "?raw", import: "default", eager: true });

export const families: StoryFile[] = Object.values(storyModules).sort((a, b) => a.meta.title.localeCompare(b.meta.title, "ru"));

export const componentDoc = (name: string) => docModules[`../docs/components/${name}.md`];

export type Guide = { slug: string; title: string; md: string };

export const guides: Guide[] = Object.entries(docModules)
  .filter(([p]) => p.startsWith("../docs/guidelines/"))
  .map(([p, md]) => ({ slug: p.replace("../docs/guidelines/", "").replace(/\.md$/, ""), title: md.match(/^#\s+(.+)$/m)?.[1] ?? p, md }))
  .sort((a, b) => a.slug.localeCompare(b.slug));
