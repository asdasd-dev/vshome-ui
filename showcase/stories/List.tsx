import { useState } from "react";
import { Artwork, List, ListRow, Price, Stack, Tag, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Categories() {
  const [cat, setCat] = useState("Мясо и птица");
  const rows: [string, string, number][] = [["🛒", "Все", 2049], ["🥩", "Мясо и птица", 186], ["🐟", "Рыба", 39], ["🧀", "Сыры", 53], ["🍷", "Алкоголь", 0]];
  return (
    <List divided={false}>
      {rows.map(([e, name, n]) => <ListRow key={name} align="center" lead={e} title={name} meta={n} tone={n ? "default" : "muted"} selected={name === cat} onClick={() => setCat(name)} />)}
    </List>
  );
}

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

const photo = (color: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="${color}"/></svg>`)}`;

export const meta: StoryFile["meta"] = { title: "List", group: "Данные", components: ["List", "ListRow"], doc: "List" };

export const stories: StoryFile["stories"] = [
  { name: "Список-навигация: выбранная строка и число справа", render: () => <Categories /> },
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
    name: "Ссылки с картинкой: href и align=\"center\"",
    render: () => (
      <List label="Подешевело в Ленте">
        <ListRow align="center" href="#/c/List" lead={<Artwork size="sm" src={photo("#9fb4cf")} />} title="Молоко 3,2%, 930 мл" sub="−25% к медиане" meta={<Price size="sm" value={8999} tone="deal" />} />
        <ListRow align="center" href="#/c/List" lead={<Artwork size="sm" src={photo("#e3c25a")} />} title="Бананы" sub="−10% к медиане" meta={<Price size="sm" value={12999} unit="кг" />} />
        <ListRow align="center" href="#/c/List" lead={<Artwork size="sm" fallback="?" />} title="Пармезан, 200 г" sub="нет в наличии" tone="muted" meta={<Price size="sm" value={34999} gone />} />
      </List>
    ),
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
