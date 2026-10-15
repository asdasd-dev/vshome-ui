import { useState } from "react";
import { List, ListRow, Stack, Tag, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Clickable() {
  const [picked, setPicked] = useState("ничего");
  return (
    <Stack gap="3">
      <List label="Ждут тебя">
        <ListRow title="Claude · personalai" sub="Готов PR T-411, жду ревью" meta="12 мин" tone="warn" onClick={() => setPicked("Claude · personalai")} />
        <ListRow title="Codex · monitoring" sub="Нужен доступ к Grafana" subTone="warn" meta="3 мин" onClick={() => setPicked("Codex · monitoring")} />
      </List>
      <Text variant="caption" tone="muted">Открыто: {picked}</Text>
    </Stack>
  );
}

export const meta: StoryFile["meta"] = { title: "List", group: "Данные", components: ["List", "ListRow"], doc: "List" };

export const stories: StoryFile["stories"] = [
  {
    name: "Строки и тоны",
    render: () => (
      <List label="Дела на сегодня">
        <ListRow lead="09:00" title="Вынести мусор" tone="muted" />
        <ListRow lead="12:00" title="Оплатить интернет" meta="до сегодня" tone="warn" />
        <ListRow lead="—" title="Продлить страховку машины" meta="просрочено" tone="danger" />
        <ListRow lead="19:00" title="Забрать посылку" meta="ПВЗ Ozon" />
      </List>
    ),
  },
  {
    name: "Два уровня",
    render: () => (
      <List label="Новости">
        <ListRow title="ЦБ сохранил ключевую ставку" sub="РБК · 12 мин назад" />
        <ListRow title="Mattermost: Иван" sub="посмотрю после синка, скинь ссылку на PR" subLines={2} meta="14:05" />
        <ListRow title="Молоко 3,2%, 930 мл" sub="Состав: молоко нормализованное, витамин D3" meta={<Tag size="sm" tone="warn">−25%</Tag>} />
      </List>
    ),
  },
  {
    name: "Нажимаемые строки",
    render: () => <Clickable />,
  },
  {
    name: "Предел и длинный текст",
    render: () => (
      <List label="Скоро" max={3}>
        <ListRow title="Замена фильтра в увлажнителе и чистка бака перед отопительным сезоном" meta="пт" />
        <ListRow title="Перенести бэкапы на новый диск, проверить восстановление из копии и удалить старые снапшоты" titleLines={2} meta="сб" />
        <ListRow title="ТО машины" meta="24 окт" />
        <ListRow title="Поменять батарейки в датчиках" meta="ноя" />
        <ListRow title="Продлить домен vshome.space" meta="дек" />
      </List>
    ),
  },
  {
    name: "Пустой",
    render: () => <List label="Агенты" empty="Никто не ждёт">{[]}</List>,
  },
  {
    name: "В киоске",
    kiosk: true,
    render: () => (
      <List label="Ждут тебя · 2" max={2}>
        <ListRow title="Claude · personalai" sub="Готов PR T-411, жду ревью" meta="12 мин" tone="warn" />
        <ListRow title="Codex · monitoring" sub="Нужен доступ к Grafana" meta="3 мин" />
        <ListRow title="Claude · lenta-tracker" sub="Тесты зелёные" meta="1 мин" />
      </List>
    ),
  },
];
