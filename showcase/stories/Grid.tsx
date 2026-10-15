import { Artwork, Card, Cluster, Grid, Price, Stack, StatusDot, Tag, Text } from "../../src";
import type { StoryFile } from "../catalog";

const photo = (color: string) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3"><rect x="1" y=".5" width="2" height="2" rx=".3" fill="${color}"/></svg>`)}`;

const products = [
  { name: "Молоко 3,2%, 930 мл", value: 8999, old: 11999, color: "#9fb4cf" },
  { name: "Гречка ядрица, 900 г", value: 11999, color: "#b9a88f" },
  { name: "Бананы", value: 12999, unit: "кг", color: "#e3c25a" },
  { name: "Сыр российский", value: 89990, old: 104990, unit: "кг", color: "#e0b45c" },
  { name: "Яйца С1, 10 шт", value: 10999, color: "#d9c7a8" },
  { name: "Кофе в зёрнах, 1 кг", value: 149999, color: "#8a6a50" },
];

const services = [
  { name: "Доска задач", host: "tasks.vshome.space", ok: true },
  { name: "Лента", host: "lenta.vshome.space", ok: true },
  { name: "Заметки", host: "notes.vshome.space", ok: true },
  { name: "Ритм заводов", host: "ritm.vshome.space", ok: false },
  { name: "Родословная", host: "family.vshome.space", ok: true },
  { name: "Мониторинг", host: "grafana.vshome.space", ok: true },
  { name: "Пароли", host: "vault.vshome.space", ok: true },
  { name: "Фото", host: "photos.vshome.space", ok: true },
];

function Products({ count = products.length }: { count?: number }) {
  return (
    <Grid min="sm" gap="3">
      {products.slice(0, count).map((p) => (
        <Card key={p.name} padding="sm">
          <Stack gap="2">
            <Artwork src={photo(p.color)} size="fill" fit="contain" backdrop="muted" />
            <Text lines={2}>{p.name}</Text>
            <Price value={p.value} old={p.old} unit={p.unit} tone={p.old ? "deal" : "default"} />
          </Stack>
        </Card>
      ))}
    </Grid>
  );
}

function Services() {
  return (
    <Grid cols={{ phone: 1, tablet: 2, desktop: 4 }} gap="3">
      {services.map((s) => (
        <Card key={s.name} href="#/c/Grid" stripe={s.ok ? undefined : "danger"}>
          <Stack as="span" gap="1">
            <Cluster as="span" gap="2"><StatusDot tone={s.ok ? "ok" : "danger"} label={s.ok ? "в сети" : "не отвечает"} /><Text weight="medium" lines={1}>{s.name}</Text></Cluster>
            <Text variant="caption" tone="muted" lines={1}>{s.host}</Text>
          </Stack>
        </Card>
      ))}
    </Grid>
  );
}

export const meta: StoryFile["meta"] = { title: "Grid", group: "Раскладка и навигация", components: ["Grid"], doc: "Grid" };

export const stories: StoryFile["stories"] = [
  { name: "Товары Ленты: min=\"sm\", колонки по ширине", render: () => <Products /> },
  { name: "Сервисы дашборда: cols по классам устройств", render: () => <Services /> },
  {
    name: "Та же сетка в узкой колонке",
    render: () => (
      <Stack gap="3">
        <Text variant="caption" tone="muted">Обёртка 360px: и min="sm", и cols дают одну колонку, хотя экран широкий</Text>
        <Cluster gap="6" align="start" wrap>
          <div style={{ maxWidth: 360, width: "100%" }}><Products count={2} /></div>
          <div style={{ maxWidth: 360, width: "100%" }}><Services /></div>
        </Cluster>
      </Stack>
    ),
  },
  {
    name: "Список карточек: as=\"ul\"",
    render: () => (
      <Grid as="ul" min="md" gap="2">
        {["T-411 · Адаптивная раскладка", "T-402 · Плитка Ленты на дашборд", "T-398 · Ночная сверка карты"].map((t, i) => (
          <Card as="li" key={t} stripe={i === 0 ? "accent" : undefined}>
            <Stack gap="1"><Text weight="medium">{t}</Text><Cluster gap="2"><Tag size="sm" tone={i === 0 ? "accent" : "muted"}>{i === 0 ? "Doing" : "Inbox"}</Tag><Text variant="caption" tone="muted">claude-code</Text></Cluster></Stack>
          </Card>
        ))}
      </Grid>
    ),
  },
];
