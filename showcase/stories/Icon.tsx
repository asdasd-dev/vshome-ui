import { Cluster, Grid, ICON_NAMES, Icon, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

export const meta: StoryFile["meta"] = { title: "Icon", group: "Текст и медиа", components: ["Icon"], doc: "Icon" };

export const stories: StoryFile["stories"] = [
  {
    name: "Все иконки",
    render: () => (
      <Grid min="xs" gap="4">
        {ICON_NAMES.map((n) => (
          <Stack key={n} gap="1" align="center"><Icon name={n} size="lg" /><Text variant="caption" tone="muted" lines={1} title={n}>{n}</Text></Stack>
        ))}
      </Grid>
    ),
  },
  {
    name: "Тоны",
    render: () => (
      <Cluster wrap gap="3">
        {(["accent", "ok", "warn", "danger", "muted", "violet", "pink", "gold"] as const).map((t) => <Icon key={t} name="dot" tone={t} label={t} />)}
        <Icon name="dot" tone="lamp" label="lamp" />
      </Cluster>
    ),
  },
];
