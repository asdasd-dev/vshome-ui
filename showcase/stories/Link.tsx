import { useState } from "react";
import { Card, Link, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

function ShowMore() {
  const [all, setAll] = useState(false);
  return (
    <Text>
      Молоко, хлеб, яйца{all ? ", сыр, гречка, яблоки" : "…"} <Link onClick={() => setAll(!all)}>{all ? "свернуть" : "показать ещё 3"}</Link>
    </Text>
  );
}

function InCard() {
  const [saved, setSaved] = useState(false);
  return (
    <Card href="#/c/Link">
      <Stack as="span" gap="1">
        <Text variant="title">Молоко 3,2%, 930 мл</Text>
        <Text tone="muted">89,99 ₽ · −25% к медиане</Text>
        <Text variant="caption"><Link tone={saved ? "muted" : "accent"} onClick={(e) => { e.preventDefault(); setSaved(!saved); }}>{saved ? "убрать из отслеживания" : "отслеживать цену"}</Link></Text>
      </Stack>
    </Card>
  );
}

export const meta: StoryFile["meta"] = { title: "Link", group: "Действия", components: ["Link"], doc: "Link" };

export const stories: StoryFile["stories"] = [
  { name: "Тона", render: () => <Stack gap="2"><Link href="#/c/Link">Открыть доску задач</Link><Link href="#/c/Link" tone="muted">Все списки покупок</Link><Link tone="danger" onClick={() => undefined}>Убрать из списка</Link></Stack> },
  { name: "Внешняя ссылка", render: () => <Stack gap="2"><Link href="https://vshome.space" external>vshome.space</Link><Link href="https://example.com" external tone="muted">Тред в Mattermost</Link></Stack> },
  { name: "Внутри текста", render: () => <Text as="p">Цена на гречку выросла на 12%. <Link href="#/c/Link" underline="always">История цен</Link> за полгода.</Text> },
  { name: "Без адреса — действие", render: () => <ShowMore /> },
  { name: "Внутри карточки-ссылки: preventDefault", render: () => <InCard /> },
  { name: "Выключенная", render: () => <Text>Отчёт за октябрь <Link href="#/c/Link" disabled>скачать</Link></Text> },
];
