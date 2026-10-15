import { Button, Cluster, ToastProvider, useToast } from "../../src";
import type { StoryFile } from "../catalog";

function Show() {
  const toast = useToast();
  return (
    <Cluster wrap>
      <Button onClick={() => toast("Сохранено")}>Сохранить</Button>
      <Button onClick={() => toast("Задача T-411 в review")}>Отправить на ревью</Button>
      <Button onClick={() => toast("Ссылка скопирована")} icon="external">Скопировать ссылку</Button>
    </Cluster>
  );
}

function Replace() {
  const toast = useToast();
  return (
    <Cluster wrap>
      <Button onClick={() => { toast("Экраны погашены"); toast("Экраны погашены · режим «Сон» до 08:00"); }}>Два подряд</Button>
      <Button onClick={() => toast("Цены обновлены: 42 товара, у 7 скидка больше 20%, самая большая — молоко 3,2%, −25%")}>Длинный текст</Button>
    </Cluster>
  );
}

export const meta: StoryFile["meta"] = { title: "Toast", group: "Обратная связь", components: ["ToastProvider", "useToast"], doc: "Toast" };

export const stories: StoryFile["stories"] = [
  { name: "Показать тост", render: () => <Show /> },
  { name: "Замена и длинный текст", render: () => <Replace /> },
  { name: "На стене", render: () => <ToastProvider className="vs-kiosk"><Show /></ToastProvider> },
];
