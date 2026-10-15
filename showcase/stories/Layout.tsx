import { Badge, Button, Card, Cluster, Divider, Stack, Tag, Text } from "../../src";
import type { StoryFile } from "../catalog";

export const meta: StoryFile["meta"] = { title: "Layout", group: "Раскладка и навигация", components: ["Cluster", "Stack", "Divider"], doc: "Layout" };

export const stories: StoryFile["stories"] = [
  {
    name: "Cluster: ряд и отступы",
    render: () => (
      <Stack gap="3">
        <Cluster gap="1"><Badge>1</Badge><Badge>2</Badge><Badge>3</Badge></Cluster>
        <Cluster gap="3"><Badge>1</Badge><Badge>2</Badge><Badge>3</Badge></Cluster>
        <Cluster gap="6"><Badge>1</Badge><Badge>2</Badge><Badge>3</Badge></Cluster>
      </Stack>
    ),
  },
  {
    name: "Cluster: выравнивание",
    render: () => (
      <Stack gap="3">
        <Card><Cluster justify="between"><Text variant="title">T-411</Text><Button size="sm">Открыть</Button></Cluster></Card>
        <Card><Cluster justify="end"><Button variant="ghost">Отмена</Button><Button variant="primary">Сохранить</Button></Cluster></Card>
        <Card><Cluster align="baseline"><Text variant="title">+7°</Text><Text tone="muted">утром +4°, днём до +11°</Text></Cluster></Card>
      </Stack>
    ),
  },
  {
    name: "Cluster: перенос и rigid",
    render: () => (
      <Stack gap="3">
        <div style={{ width: 260 }}>
          <Cluster wrap>{["personalai", "monitoring", "lenta-tracker", "alice-skill", "vshome-ui"].map((r) => <Tag key={r}>{r}</Tag>)}</Cluster>
        </div>
        <div style={{ width: 260 }}>
          <Cluster rigid>{["personalai", "monitoring", "lenta-tracker"].map((r) => <Tag key={r}>{r}</Tag>)}</Cluster>
        </div>
      </Stack>
    ),
  },
  {
    name: "Stack: колонка",
    render: () => (
      <Cluster gap="6" align="start">
        <Stack gap="1"><Text variant="title">Ритм заводов</Text><Text tone="muted">неделя 41</Text></Stack>
        <Stack gap="2" align="center"><Text variant="title">10:46</Text><Text tone="muted">чт, 15 октября</Text></Stack>
        <Stack gap="1" align="end"><Text variant="title">48 230 ₽</Text><Text tone="muted">за октябрь</Text></Stack>
      </Cluster>
    ),
  },
  {
    name: "Stack: justify",
    render: () => (
      <Card>
        <div style={{ height: 160, display: "grid" }}>
          <Stack justify="between">
            <Text variant="title">Ритм заводов</Text>
            <Cluster justify="end"><Button size="sm">Открыть</Button></Cluster>
          </Stack>
        </div>
      </Card>
    ),
  },
  {
    name: "Divider",
    render: () => (
      <Stack gap="3">
        <Text>Встречи</Text>
        <Divider />
        <Text>Агенты</Text>
        <Cluster gap="2"><Text>Мак</Text><Divider vertical /><Text>бокс</Text><Divider vertical /><Text>роутер</Text></Cluster>
      </Stack>
    ),
  },
];
