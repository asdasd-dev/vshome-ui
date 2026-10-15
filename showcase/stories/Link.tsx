import { useState } from "react";
import { Link, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

function ShowMore() {
  const [all, setAll] = useState(false);
  return (
    <Text>
      Молоко, хлеб, яйца{all ? ", сыр, гречка, яблоки" : "…"} <Link onClick={() => setAll(!all)}>{all ? "свернуть" : "показать ещё 3"}</Link>
    </Text>
  );
}

export const meta: StoryFile["meta"] = { title: "Link", group: "Действия", components: ["Link"], doc: "Link" };

export const stories: StoryFile["stories"] = [
  { name: "Тона", render: () => <Stack gap="2"><Link href="#/c/Link">Открыть доску задач</Link><Link href="#/c/Link" tone="muted">Все списки покупок</Link><Link tone="danger" onClick={() => undefined}>Убрать из списка</Link></Stack> },
  { name: "Внешняя ссылка", render: () => <Stack gap="2"><Link href="https://vshome.space" external>vshome.space</Link><Link href="https://example.com" external tone="muted">Тред в Mattermost</Link></Stack> },
  { name: "Внутри текста", render: () => <Text as="p">Цена на гречку выросла на 12%. <Link href="#/c/Link" underline="always">История цен</Link> за полгода.</Text> },
  { name: "Без адреса — действие", render: () => <ShowMore /> },
  { name: "Выключенная", render: () => <Text>Отчёт за октябрь <Link href="#/c/Link" disabled>скачать</Link></Text> },
];
