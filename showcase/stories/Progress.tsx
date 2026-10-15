import { useState } from "react";
import { Button, Cluster, Legend, Progress, SplitBar, Stack, Stat, Text } from "../../src";
import type { StoryFile } from "../catalog";

function Live() {
  const [done, setDone] = useState(3);
  return (
    <Stack gap="3">
      <Text variant="caption" tone="muted">Дела на сегодня: {done} из 8</Text>
      <Progress label="Дела на сегодня" value={done} max={8} />
      <Cluster><Button size="sm" onClick={() => setDone(Math.max(0, done - 1))}>Меньше</Button><Button size="sm" onClick={() => setDone(Math.min(8, done + 1))}>Сделано</Button></Cluster>
    </Stack>
  );
}

export const meta: StoryFile["meta"] = { title: "Progress", group: "Данные", components: ["Progress", "SplitBar"], doc: "Progress" };

export const stories: StoryFile["stories"] = [
  {
    name: "Тоны",
    render: () => (
      <Stack gap="3">
        <Progress label="Прошло от синка" value={20} max={30} />
        <Progress label="Бюджет на еду" tone="ok" value={18200} max={35000} />
        <Progress label="Трафик VPN" tone="warn" value={46} max={50} />
        <Progress label="Подписки" tone="danger" value={6200} max={5000} />
        <Progress label="Резерв" tone="muted" value={40} />
      </Stack>
    ),
  },
  {
    name: "Под цифрой",
    render: () => (
      <Stack gap="2">
        <Stat size="md" value="31 400" unit="₽" caption="Еда · бюджет 35 000 ₽" />
        <Progress size="sm" tone="warn" label="Бюджет на еду" value={31400} max={35000} />
      </Stack>
    ),
  },
  { name: "Меняется", render: () => <Live /> },
  {
    name: "SplitBar с легендой",
    render: () => (
      <Stack gap="2">
        <SplitBar label="Расходы за октябрь" parts={[
          { label: "Еда", value: 31400, tone: "accent" },
          { label: "Подписки", value: 4980, tone: "warn" },
          { label: "Транспорт", value: 2150, color: "var(--vs-violet)" },
          { label: "Кафе", value: 0, tone: "muted" },
        ]} />
        <Legend items={[{ label: "Еда", tone: "accent" }, { label: "Подписки", tone: "warn" }, { label: "Транспорт", tone: "violet" }]} />
      </Stack>
    ),
  },
  {
    name: "SplitBar: доска задач",
    render: () => (
      <Stack gap="2">
        <SplitBar size="sm" label="Задачи на доске" parts={[
          { label: "inbox", value: 12, tone: "muted" },
          { label: "doing", value: 3, tone: "accent" },
          { label: "review", value: 2, tone: "warn" },
        ]} />
        <Legend items={[{ label: "inbox 12", tone: "muted", shape: "square" }, { label: "doing 3", tone: "accent", shape: "square" }, { label: "review 2", tone: "warn", shape: "square" }]} />
      </Stack>
    ),
  },
];
