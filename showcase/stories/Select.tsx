import { useState } from "react";
import { Select, Stack } from "../../src";
import type { StoryFile } from "../catalog";

function Shop() {
  const [shop, setShop] = useState("pobedy");
  return (
    <Select label="Магазин" value={shop} onChange={setShop} options={[
      { value: "pobedy", label: "Лента на Победы" },
      { value: "mega", label: "Лента в Мега" },
      { value: "sever", label: "Лента на Северном" },
      { value: "online", label: "Доставка Ленты" },
    ]} />
  );
}

function Room() {
  const [room, setRoom] = useState("hall");
  return (
    <Select label="Комната" value={room} onChange={setRoom} options={[
      { value: "hall", label: "Коридор" },
      { value: "kitchen", label: "Кухня" },
      { value: "bedroom", label: "Спальня" },
      { value: "kids", label: "Детская" },
      { value: "bath", label: "Ванная" },
      { value: "yard", label: "Двор" },
    ]} />
  );
}

export const meta: StoryFile["meta"] = { title: "Select", group: "Выбор и ввод", components: ["Select"], doc: "Select" };

export const stories: StoryFile["stories"] = [
  { name: "Обычный", render: () => <Shop /> },
  { name: "Несколько в форме", render: () => <Stack gap="3"><Room /><Shop /></Stack> },
  { name: "Длинная подпись", render: () => <Select label="Канал Mattermost" value="long" onChange={() => undefined} options={[{ value: "long", label: "Уведомления о встречах и задачах из доски агентов" }, { value: "short", label: "Личка" }]} /> },
  { name: "Подсказка и ошибка", render: () => (
    <Stack gap="3">
      <Select label="Комната" hint="Куда поставить новый датчик" value="hall" onChange={() => undefined} options={[{ value: "hall", label: "Коридор" }, { value: "kitchen", label: "Кухня" }]} />
      <Select label="Канал Mattermost" error="Бот не добавлен в канал" value="town" onChange={() => undefined} options={[{ value: "town", label: "town-square" }, { value: "me", label: "Личка" }]} />
    </Stack>
  ) },
  { name: "Без видимой подписи", render: () => <Select label="Сортировка товаров" hideLabel value="price" onChange={() => undefined} options={[{ value: "price", label: "Сначала дешёвые" }, { value: "discount", label: "Сначала со скидкой" }]} /> },
  { name: "Выключенный", render: () => <Select label="Проект" value="vshome" onChange={() => undefined} disabled options={[{ value: "vshome", label: "vshome-ui" }]} /> },
];
