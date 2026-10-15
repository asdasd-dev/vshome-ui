import { Excerpt, Stat, Tile } from "../../src";
import type { StoryFile } from "../catalog";

const agenda = "Повестка:\n1. Итоги спринта и что не успели\n2. Каталог дизайн-системы: T-411, страницы компонентов\n3. Плитка VPN на дашборде\n4. Перенос бэкапов на новый диск\n\nСсылка на доску: tasks.vshome.space\nУчастники: команда Deimos";

export const meta: StoryFile["meta"] = { title: "Excerpt", group: "Текст и медиа", components: ["Excerpt"], doc: "Excerpt" };

export const stories: StoryFile["stories"] = [
  {
    name: "Короткий текст",
    render: () => <Excerpt title="Синк Deimos">Обсуждаем итоги спринта.</Excerpt>,
  },
  {
    name: "Длинный текст с переносами",
    render: () => <Excerpt title="Синк Deimos">{agenda}</Excerpt>,
  },
  {
    name: "В плитке встречи",
    render: () => (
      <Tile label="Следующая встреча">
        <Stat size="md" tone="muted" value="14:00" unit="через 40 мин" caption="Синк Deimos" />
        <Excerpt title="Синк Deimos">{agenda}</Excerpt>
      </Tile>
    ),
  },
  {
    name: "В киоске",
    kiosk: true,
    render: () => (
      <Tile label="Встреча · 14:00">
        <Stat size="md" value={12} unit="мин" caption="Синк Deimos" />
        <Excerpt title="Синк Deimos">{agenda}</Excerpt>
      </Tile>
    ),
  },
];
