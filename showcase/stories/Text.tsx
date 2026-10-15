import { Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

const roles = ["display", "headline", "title", "lead", "body", "caption", "label"] as const;

export const meta: StoryFile["meta"] = { title: "Text", group: "Текст и медиа", components: ["Text"], doc: "Text" };

export const stories: StoryFile["stories"] = [
  {
    name: "Шкала ролей",
    render: () => (
      <Stack gap="3">
        {roles.map((v) => <Text key={v} variant={v} as="div">{v} · Синк Deimos в 12:00</Text>)}
      </Stack>
    ),
  },
  {
    name: "Тоны и начертание",
    render: () => (
      <Stack gap="2">
        <Text as="p">Молоко 3,2% — 89,99 ₽</Text>
        <Text as="p" tone="muted">На сегодня всё</Text>
        <Text as="p" tone="ok">Счёт за интернет оплачен</Text>
        <Text as="p" tone="warn">Встреча через 3 мин</Text>
        <Text as="p" tone="danger">VPN не в сети с 08:14</Text>
        <Text as="p"><Text tone="gold">★★★★★</Text> 4,7 · 128 отзывов в Ленте</Text>
        <Text as="p"><Text tone="accent">T-411</Text> перешла в Doing · <Text tone="violet">Домлаб</Text> · <Text tone="pink">Отдых</Text></Text>
        <Text as="p"><Text weight="semibold">Иван</Text> ответил в MM: «посмотрю после синка»</Text>
        <Text as="p"><Text weight="medium">T-411</Text> Каталог дизайн-системы</Text>
      </Stack>
    ),
  },
  {
    name: "Заголовки страницы и блока",
    render: () => (
      <Stack gap="2">
        <Text variant="label" as="h2">Скоро</Text>
        <Text variant="title" as="h3">Замена фильтра в увлажнителе</Text>
        <Text as="p">Купить фильтр и поменять до пятницы, старый отработал 3 месяца.</Text>
        <Text variant="caption" tone="muted">Доска задач · обновлено 5 мин назад</Text>
      </Stack>
    ),
  },
  {
    name: "Обрезка длинного текста",
    render: () => (
      <Stack gap="3">
        <Text as="p" lines={1} title="Центробанк сохранил ключевую ставку, аналитики ждут снижения не раньше декабря, рынок отреагировал ростом">Центробанк сохранил ключевую ставку, аналитики ждут снижения не раньше декабря, рынок отреагировал ростом</Text>
        <Text as="p" lines={2}>Состав: молоко нормализованное, закваска молочнокислых микроорганизмов, стабилизатор пектин, сахар, ароматизатор натуральный «Ваниль», витамин D3, без консервантов и заменителей молочного жира.</Text>
        <Text as="p" lines={3} tone="muted">Обновить @vshome/ui на стене, в «Столе», на доске задач и в Ленте, проверить сборку сайта, прогнать скриншоты в киоске и на телефоне, выкатить после зелёных тестов и закрыть задачу на доске с итогом.</Text>
      </Stack>
    ),
  },
  {
    name: "В киоске",
    kiosk: true,
    render: () => (
      <Stack gap="2">
        <Text variant="label">Скоро</Text>
        <Text variant="display">14:32</Text>
        <Text variant="headline">Синк Deimos</Text>
        <Text tone="muted">Никто не ждёт</Text>
        <Text variant="caption" tone="muted">РБК · 12 мин назад</Text>
      </Stack>
    ),
  },
];
