import { Artwork, Cluster, Icon, Stack, Text, Tile } from "../../src";
import type { StoryFile } from "../catalog";

const cover = (color: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="${color}"/></svg>`)}`;

export const meta: StoryFile["meta"] = { title: "Artwork", group: "Текст и медиа", components: ["Artwork"], doc: "Artwork" };

export const stories: StoryFile["stories"] = [
  { name: "Размеры", render: () => <Cluster gap="4" align="center"><Artwork src={cover("#b9a88f")} size="sm" /><Artwork src={cover("#7a8fb9")} /><Artwork src={cover("#8fb99a")} size="lg" /></Cluster> },
  {
    name: "Заглушка",
    render: () => (
      <Cluster gap="4" align="center">
        <Artwork fallback="♪" />
        <Artwork src="data:image/png;base64,AAAA" alt="Обложка альбома" fallback={<Icon name="play" size="lg" />} />
        <Artwork size="lg" fallback="♪" />
      </Cluster>
    ),
  },
  {
    name: "Музыка на «Столе»",
    kiosk: true,
    render: () => (
      <div style={{ width: 360 }}>
        <Tile label="Музыка">
          <Cluster gap="4">
            <Artwork src={cover("#b9a88f")} size="lg" alt="Under the Milky Way" />
            <Stack gap="1"><Text variant="title" lines={1}>Under the Milky Way</Text><Text tone="muted" lines={1}>The Church</Text></Stack>
          </Cluster>
        </Tile>
      </div>
    ),
  },
];
