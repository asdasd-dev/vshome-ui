import { Artwork, Card, Cluster, Grid, Price, Stack, Text } from "../../src";
import type { StoryFile } from "../catalog";

const photo = (color: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3"><rect x="1" y=".5" width="2" height="2" rx=".3" fill="${color}"/></svg>`)}`;

export const meta: StoryFile["meta"] = { title: "Price", group: "Данные", components: ["Price"], doc: "Price" };

export const stories: StoryFile["stories"] = [
  { name: "Размеры", render: () => <Cluster gap="6" align="baseline" wrap><Price size="sm" value={8999} /><Price value={8999} /><Price size="lg" value={8999} /></Cluster> },
  {
    name: "Скидка и цена по карте",
    render: () => (
      <Stack gap="3">
        <Price value={8999} old={11999} tone="deal" />
        <Price value={7999} old={11999} tone="deal" note="по карте" />
        <Price size="lg" value={149999} old={189999} tone="deal" note="по карте" />
      </Stack>
    ),
  },
  { name: "За килограмм", render: () => <Cluster gap="6" wrap><Price value={12999} unit="кг" /><Price value={89990} old={104990} unit="кг" tone="deal" /></Cluster> },
  {
    name: "Приглушённая и нет в наличии",
    render: () => (
      <Stack gap="3">
        <Cluster gap="3"><Price tone="muted" value={11999} /><Text variant="caption" tone="muted">цена в другом магазине</Text></Cluster>
        <Cluster gap="3"><Price gone value={34999} /><Text variant="caption" tone="muted">Сыр пармезан · нет в наличии</Text></Cluster>
      </Stack>
    ),
  },
  {
    name: "В карточках товаров Ленты",
    render: () => (
      <Grid min="xs" gap="3">
        {[
          { name: "Молоко 3,2%, 930 мл", value: 7999, old: 11999, note: "по карте", color: "#9fb4cf" },
          { name: "Бананы", value: 12999, unit: "кг", color: "#e3c25a" },
          { name: "Пармезан, 200 г", value: 34999, gone: true, color: "#e0b45c" },
        ].map((p) => (
          <Card key={p.name} padding="sm">
            <Stack gap="2">
              <Artwork src={photo(p.color)} size="fill" fit="contain" backdrop="muted" />
              <Text lines={2} tone={p.gone ? "muted" : "default"}>{p.name}</Text>
              <Price value={p.value} old={p.old} unit={p.unit} note={p.note} gone={p.gone} tone={p.old ? "deal" : "default"} />
            </Stack>
          </Card>
        ))}
      </Grid>
    ),
  },
];
