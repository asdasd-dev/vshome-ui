import { KeyValue } from "../../src";
import type { StoryFile } from "../catalog";

export const meta: StoryFile["meta"] = { title: "KeyValue", group: "Данные", components: ["KeyValue"], doc: "KeyValue" };

export const stories: StoryFile["stories"] = [
  {
    name: "Сводка сервиса",
    render: () => (
      <KeyValue items={[
        { label: "VPN", value: "в сети", tone: "ok" },
        { label: "Трафик", value: "12,4 ГБ", hint: "за октябрь" },
        { label: "Аптайм", value: "99,7%" },
        { label: "Последний сбой", value: "—", tone: "muted" },
      ]} />
    ),
  },
  {
    name: "Колонки и тоны",
    render: () => (
      <KeyValue cols={3} items={[
        { label: "Расходы", value: "48 230 ₽", hint: "−18% к сентябрю", tone: "ok" },
        { label: "Еда", value: "31 400 ₽", hint: "бюджет 35 000 ₽" },
        { label: "Подписки", value: "4 980 ₽", hint: "+1 200 ₽ к сентябрю", tone: "warn" },
        { label: "Коммуналка", value: "просрочено", tone: "danger" },
        { label: "Транспорт", value: "2 150 ₽" },
        { label: "Кафе", value: "—", tone: "muted" },
      ]} />
    ),
  },
  {
    name: "Маленький, в одну колонку",
    render: () => (
      <KeyValue size="sm" cols={1} items={[
        { label: "Цена", value: "89,99 ₽", hint: "обычно 119,99 ₽" },
        { label: "Вес", value: "930 мл" },
        { label: "Состав", value: "молоко нормализованное, витамин D3, без консервантов и заменителей молочного жира" },
      ]} />
    ),
  },
  {
    name: "В киоске",
    kiosk: true,
    render: () => (
      <KeyValue items={[
        { label: "VPN", value: "не в сети", tone: "danger", hint: "с 08:14" },
        { label: "Сервисы", value: "23 из 24" },
      ]} />
    ),
  },
];
