import { useState } from "react";
import { Chip, ChipGroup, Cluster, Stack } from "../../src";
import type { StoryFile } from "../catalog";

function Statuses({ size }: { size?: "sm" | "md" }) {
  const [status, setStatus] = useState<"all" | "inbox" | "doing" | "review" | "archive">("all");
  return (
    <ChipGroup label="Статус задачи" size={size} value={status} onChange={setStatus} options={[
      { value: "all", label: "Все", count: 7 },
      { value: "inbox", label: "Inbox", count: 4 },
      { value: "doing", label: "Doing", count: 2 },
      { value: "review", label: "Review", count: 1 },
      { value: "archive", label: "Архив", count: 0, disabled: true },
    ]} />
  );
}

function Categories() {
  const [cat, setCat] = useState("all");
  return (
    <ChipGroup label="Категория" scroll value={cat} onChange={setCat} options={[
      { value: "all", label: "Все товары" },
      { value: "milk", label: "Молочка" },
      { value: "veg", label: "Овощи и фрукты" },
      { value: "grocery", label: "Бакалея" },
      { value: "meat", label: "Мясо и рыба" },
      { value: "bread", label: "Хлеб" },
      { value: "home", label: "Для дома" },
    ]} />
  );
}

function Filters() {
  const [sale, setSale] = useState(true);
  const [stock, setStock] = useState(false);
  return (
    <Cluster wrap>
      <Chip pressed={sale} onClick={() => setSale(!sale)}>Со скидкой</Chip>
      <Chip pressed={stock} onClick={() => setStock(!stock)}>Есть в наличии</Chip>
      <Chip disabled>Доставка сегодня</Chip>
    </Cluster>
  );
}

export const meta: StoryFile["meta"] = { title: "Chip", group: "Выбор и ввод", components: ["Chip", "ChipGroup"], doc: "Chip" };

export const stories: StoryFile["stories"] = [
  { name: "Группа со счётчиками", render: () => <Statuses /> },
  { name: "Размеры", render: () => <Stack gap="3"><Statuses /><Statuses size="sm" /></Stack> },
  { name: "Прокрутка", render: () => <Categories /> },
  { name: "Независимые фильтры и выключенный", render: () => <Filters /> },
  { name: "Ссылки", render: () => <Cluster wrap><Chip href="#/c/Chip" pressed>Все списки</Chip><Chip href="#/c/Chip">Дом</Chip><Chip href="#/c/Chip">Дача</Chip></Cluster> },
  { name: "Внешние ссылки", render: () => <Cluster wrap><Chip href="https://lenta.com" external>lenta.com</Chip><Chip href="https://t.me" external count={12}>Ритм заводов</Chip></Cluster> },
  { name: "В киоске", kiosk: true, render: () => <Stack gap="3"><Statuses /><Filters /></Stack> },
];
