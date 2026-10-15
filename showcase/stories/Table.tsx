import { useState } from "react";
import { Stack, StatusDot, Table, Tag, Text, type TableColumn } from "../../src";
import type { StoryFile } from "../catalog";

type Product = { id: number; name: string; price: string; old: string; discount: number; shop: string };

const products: Product[] = [
  { id: 1, name: "Молоко 3,2%, 930 мл", price: "89,99 ₽", old: "119,99 ₽", discount: 25, shop: "Лента Химки" },
  { id: 2, name: "Сыр российский, 200 г", price: "189,99 ₽", old: "229,99 ₽", discount: 17, shop: "Лента Химки" },
  { id: 3, name: "Кефир 1%, 900 мл", price: "79,99 ₽", old: "79,99 ₽", discount: 0, shop: "Лента Сходня" },
  { id: 4, name: "Хлеб «Бородинский» нарезанный в упаковке, 300 г", price: "54,99 ₽", old: "64,99 ₽", discount: 15, shop: "Лента Сходня" },
];

const productColumns: TableColumn<Product>[] = [
  { key: "name", label: "Товар" },
  { key: "price", label: "Цена", numeric: true, nowrap: true },
  { key: "old", label: "Было", numeric: true, nowrap: true, muted: true },
  { key: "discount", label: "Скидка", width: "96px", render: (r) => (r.discount ? <Tag size="sm" tone="warn">−{r.discount}%</Tag> : <Text variant="caption" tone="muted">—</Text>) },
  { key: "shop", label: "Магазин", muted: true, nowrap: true },
];

type Service = { name: string; port: number; up: boolean; host: string };

const services: Service[] = [
  { name: "notes", port: 8080, up: true, host: "notes.vshome.space" },
  { name: "tasks", port: 8091, up: true, host: "tasks.vshome.space" },
  { name: "lenta", port: 8095, up: false, host: "lenta.vshome.space" },
  { name: "grafana", port: 3000, up: true, host: "LAN" },
];

const serviceColumns: TableColumn<Service>[] = [
  { key: "up", label: "", width: "24px", render: (r) => <StatusDot tone={r.up ? "ok" : "danger"} label={r.up ? "в сети" : "не отвечает"} /> },
  { key: "name", label: "Сервис", nowrap: true },
  { key: "port", label: "Порт", numeric: true },
  { key: "host", label: "Адрес", muted: true },
];

function Clickable() {
  const [open, setOpen] = useState<string>("ничего");
  return (
    <Stack gap="3">
      <Table caption="Сервисы бокса" columns={serviceColumns} rows={services} rowKey={(r) => r.name} onRowClick={(r) => setOpen(r.host)} />
      <Text variant="caption" tone="muted">Открыто: {open}</Text>
    </Stack>
  );
}

export const meta: StoryFile["meta"] = { title: "Table", group: "Данные", components: ["Table"], doc: "Table" };

export const stories: StoryFile["stories"] = [
  { name: "Цены в Ленте", render: () => <Table caption="Цены в Ленте" columns={productColumns} rows={products} rowKey={(r) => r.id} /> },
  { name: "Плотная", render: () => <Table dense caption="Цены в Ленте" columns={productColumns} rows={products} rowKey={(r) => r.id} /> },
  { name: "Нажимаемые строки", render: () => <Clickable /> },
  { name: "Пустая", render: () => <Table caption="Покупки" columns={productColumns} rows={[]} rowKey={(r) => r.id} empty="Покупок за октябрь пока нет" /> },
];
