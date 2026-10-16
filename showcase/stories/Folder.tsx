import { Card, Folder, Grid, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

const APPS = [["🎬", "Jellyfin"], ["🍿", "Jellyseerr"], ["🎞️", "Radarr"], ["📺", "Sonarr"], ["⬇️", "qBittorrent"], ["🔎", "Jackett"]];

const tile = (icon: string, name: string) => (
  <Stack as="span" gap="1" align="center">
    <Text variant="headline">{icon}</Text>
    <Text variant="caption" align="center" lines={2}>{name}</Text>
  </Stack>
);

export const meta: StoryFile["meta"] = { title: "Folder", group: "Поверхности", components: ["Folder"], doc: "Folder" };

export const stories: StoryFile["stories"] = [
  {
    name: "Папка приложений",
    render: () => (
      <Grid min="2xs" gap="2" fixed>
        <Folder title="Медиа" tooltip="Кино и сериалы" trigger={tile("🎬", "Медиа")}>
          <Grid min="2xs" gap="2">
            {APPS.map(([i, n]) => <Card key={n} padding="sm" href="#">{tile(i!, n!)}</Card>)}
          </Grid>
        </Folder>
        <Card padding="sm" href="#">{tile("☁️", "Облако")}</Card>
      </Grid>
    ),
  },
];
