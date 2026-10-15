import { Cluster, Legend, List, ListRow, StatusDot, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

export const meta: StoryFile["meta"] = { title: "Legend", group: "Данные", components: ["Legend", "StatusDot"], doc: "Legend" };

export const stories: StoryFile["stories"] = [
  {
    name: "Формы образцов",
    render: () => (
      <Legend items={[
        { label: "Расходы", shape: "line" },
        { label: "План", shape: "dash", tone: "muted" },
        { label: "Еда", shape: "square", tone: "ok" },
        { label: "Подписки", tone: "warn" },
      ]} />
    ),
  },
  {
    name: "Тоны и свой цвет",
    render: () => (
      <Legend items={[
        { label: "Работа", tone: "accent" },
        { label: "Домлаб", tone: "violet" },
        { label: "Отдых", tone: "pink" },
        { label: "Обучение", tone: "gold" },
        { label: "Без категории", tone: "muted" },
        { label: "Свой цвет графика", color: "#14b8a6" },
      ]} />
    ),
  },
  {
    name: "Длинная легенда",
    render: () => (
      <Legend items={["Еда", "Подписки", "Транспорт", "Кафе", "Коммуналка", "Связь", "Здоровье", "Подарки", "Одежда", "Прочее"].map((label, i) => ({ label, tone: (["accent", "ok", "warn", "danger", "violet", "pink", "gold", "muted"] as const)[i % 8], shape: "square" as const }))} />
    ),
  },
  {
    name: "StatusDot",
    render: () => (
      <Stack gap="3">
        <Cluster gap="4" wrap>
          <Cluster gap="2"><StatusDot /><Text>в сети</Text></Cluster>
          <Cluster gap="2"><StatusDot tone="warn" /><Text>ждёт ответа</Text></Cluster>
          <Cluster gap="2"><StatusDot tone="danger" /><Text>упал</Text></Cluster>
          <Cluster gap="2"><StatusDot tone="muted" /><Text>выключен</Text></Cluster>
          <Cluster gap="2"><StatusDot tone="accent" pulse /><Text>в эфире</Text></Cluster>
        </Cluster>
        <List label="Сервисы">
          <ListRow lead={<StatusDot tone="ok" label="в сети" />} title="notes.vshome.space" meta="8 мс" />
          <ListRow lead={<StatusDot tone="danger" label="не отвечает" />} title="lenta.vshome.space" meta="таймаут" tone="danger" />
          <ListRow lead={<StatusDot tone="accent" pulse label="работает" />} title="Claude · personalai" meta="12 мин" />
        </List>
      </Stack>
    ),
  },
];
