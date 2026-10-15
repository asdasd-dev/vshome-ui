import { Artwork, Card, Cluster, Grid, Icon, Price, Stack, Text, Tile } from "../../src";
import type { StoryFile } from "../catalog";

const cover = (color: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect width="1" height="1" fill="${color}"/></svg>`)}`;

const pack = (color: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 3"><rect x=".2" y=".2" width="1.6" height="2.6" rx=".2" fill="${color}"/></svg>`)}`;

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
    name: "Фото товара: fill, contain и backdrop",
    render: () => (
      <Grid min="xs" gap="3">
        <Card padding="sm"><Stack gap="2"><Artwork size="fill" src={pack("#9fb4cf")} /><Text variant="caption" tone="muted">cover: упаковка обрезана</Text></Stack></Card>
        <Card padding="sm"><Stack gap="2"><Artwork size="fill" fit="contain" src={pack("#9fb4cf")} /><Text variant="caption" tone="muted">contain: целиком</Text></Stack></Card>
        <Card padding="sm"><Stack gap="2"><Artwork size="fill" fit="contain" backdrop="muted" src={pack("#9fb4cf")} /><Price size="sm" value={8999} /></Stack></Card>
        <Card padding="sm"><Stack gap="2"><Artwork size="fill" fit="contain" backdrop="gold" src={pack("#e0b45c")} loading="eager" /><Price size="sm" value={34999} old={41999} tone="deal" /></Stack></Card>
        <Card padding="sm"><Stack gap="2"><Artwork size="fill" backdrop="violet" fallback={<Icon name="cart" size="lg" />} /><Text variant="caption" tone="muted">нет фото</Text></Stack></Card>
      </Grid>
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
