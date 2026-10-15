import { Badge, Cluster, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

export const meta: StoryFile["meta"] = { title: "Badge", group: "Данные", components: ["Badge"], doc: "Badge" };

export const stories: StoryFile["stories"] = [
  {
    name: "Тоны",
    render: () => (
      <Cluster wrap gap="3">
        <Badge label="3 новых новости">3</Badge>
        <Badge tone="warn" label="2 агента ждут">2</Badge>
        <Badge tone="danger" label="1 сервис упал">1</Badge>
        <Badge tone="ok" label="4 задачи готовы">4</Badge>
        <Badge tone="muted" label="12 в архиве">12</Badge>
      </Cluster>
    ),
  },
  {
    name: "Рядом с подписью",
    render: () => (
      <Stack gap="2">
        <Cluster gap="2"><Text>Mattermost</Text><Badge tone="warn" label="5 непрочитанных">5</Badge></Cluster>
        <Cluster gap="2"><Text>Inbox на доске</Text><Badge label="3 задачи в inbox">3</Badge></Cluster>
        <Cluster gap="2"><Text>Новости</Text><Badge dot label="Есть новые" /></Cluster>
      </Stack>
    ),
  },
  {
    name: "Предел max",
    render: () => (
      <Cluster wrap gap="3">
        <Badge max={99} label="42 сообщения">{42}</Badge>
        <Badge max={99} label="140 сообщений">{140}</Badge>
        <Badge max={9} tone="danger" label="23 ошибки">{23}</Badge>
      </Cluster>
    ),
  },
  {
    name: "Точки",
    render: () => (
      <Cluster gap="3">
        <Badge dot label="Новое" />
        <Badge dot tone="warn" label="Ждёт ответа" />
        <Badge dot tone="danger" label="Сбой" />
        <Badge dot tone="ok" label="Готово" />
      </Cluster>
    ),
  },
  {
    name: "В киоске",
    kiosk: true,
    render: () => <Cluster gap="2"><Text>Ждут тебя</Text><Badge tone="warn" label="2 агента ждут">2</Badge><Badge dot label="Есть новые" /></Cluster>,
  },
];
