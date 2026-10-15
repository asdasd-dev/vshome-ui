import { Banner, Button, Stack } from "../../src";
import type { StoryFile } from "../catalog";

export const meta: StoryFile["meta"] = { title: "Banner", group: "Обратная связь", components: ["Banner"], doc: "Banner" };

export const stories: StoryFile["stories"] = [
  {
    name: "Строка: тоны",
    render: () => (
      <Stack gap="2">
        <Banner>Данные за 10 мин назад</Banner>
        <Banner tone="danger">Лента не отвечает</Banner>
        <Banner tone="accent">Режим «Сон» до 08:00</Banner>
        <Banner tone="ok">VPN снова в сети</Banner>
        <Banner tone="muted">Показаны данные из кэша</Banner>
      </Stack>
    ),
  },
  {
    name: "Блок с заголовком и действием",
    render: () => (
      <Stack gap="3">
        <Banner variant="box" tone="danger" title="VPN не в сети" action={<Button size="sm">Проверить</Button>}>С 08:14 нет связи с роутером, сайты в обход не открываются.</Banner>
        <Banner variant="box" title="Цены не обновлялись сутки" action={<Button size="sm">Обновить</Button>}>Последняя выгрузка из Ленты — вчера в 06:00.</Banner>
        <Banner variant="box" tone="accent">Вышла @vshome/ui 0.21: обнови стену и «Стол».</Banner>
        <Banner variant="box" tone="ok" title="Бэкап восстановлен">Проверка копии от 14 октября прошла.</Banner>
      </Stack>
    ),
  },
  {
    name: "Обрезка длинного текста",
    render: () => (
      <Stack gap="2">
        <Banner truncate>Агент в personalai ждёт ответа 40 минут: нужен доступ к Vaultwarden, чтобы прочитать токен Mattermost</Banner>
        <Banner variant="box" tone="danger">Агент в personalai ждёт ответа 40 минут: нужен доступ к Vaultwarden, чтобы прочитать токен Mattermost, иначе ночной дайджест не соберётся и задача T-411 останется в doing.</Banner>
      </Stack>
    ),
  },
  {
    name: "В киоске",
    kiosk: true,
    render: () => (
      <Stack gap="3">
        <Banner>2 в MM</Banner>
        <Banner variant="box" tone="danger" title="VPN не в сети" action={<Button size="sm">Проверить</Button>}>С 08:14 нет связи с роутером.</Banner>
      </Stack>
    ),
  },
];
