import { useState } from "react";
import { Button, Cluster, Stack } from "../../src";
import type { StoryFile } from "../catalog";

const slow = (ok: boolean) => () => new Promise<boolean>((r) => setTimeout(() => r(ok), 1500));

function Pressed() {
  const [night, setNight] = useState(true);
  const [bania, setBania] = useState(true);
  return (
    <Cluster wrap>
      <Button pressed={night} onClick={() => setNight(!night)}>Ночной</Button>
      <Button pressed={bania} indicator="lamp" onClick={() => setBania(!bania)}>Баня</Button>
    </Cluster>
  );
}

export const meta: StoryFile["meta"] = { title: "Button", group: "Действия", components: ["Button"], doc: "Button" };

export const stories: StoryFile["stories"] = [
  { name: "Варианты", render: () => <Cluster wrap><Button variant="primary">Сохранить</Button><Button>Отмена</Button><Button variant="ghost">Подробнее</Button><Button variant="danger">Удалить</Button><Button variant="warn" icon="dot">2 в MM</Button></Cluster> },
  { name: "Размеры и форма", render: () => <Stack gap="3"><Cluster wrap align="center"><Button size="sm">Маленькая</Button><Button>Обычная</Button><Button size="lg">Большая</Button><Button shape="pill">Капсула</Button></Cluster><Button block variant="primary">На всю ширину</Button></Stack> },
  { name: "Иконка и загрузка", render: () => <Cluster wrap><Button icon="plus">Добавить</Button><Button loading>Сохранить</Button><Button disabled>Недоступна</Button></Cluster> },
  { name: "Ждёт ответа", kiosk: true, render: () => <Cluster wrap><Button onClick={slow(true)}>Парадная</Button><Button onClick={slow(false)}>Калитка 1 (ошибка)</Button></Cluster> },
  { name: "Нажатая и лампа", render: () => <Pressed /> },
  { name: "В киоске", kiosk: true, render: () => <Cluster wrap><Button variant="primary">Войти</Button><Button>Пропустить</Button><Button size="sm">Погасить экраны</Button><Pressed /></Cluster> },
];
