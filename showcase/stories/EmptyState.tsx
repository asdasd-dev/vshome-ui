import { Button, Card, EmptyState, Link } from "../../src";
import type { StoryFile } from "../catalog";

export const meta: StoryFile["meta"] = { title: "EmptyState", group: "Обратная связь", components: ["EmptyState"], doc: "EmptyState" };

export const stories: StoryFile["stories"] = [
  {
    name: "Полный",
    render: () => (
      <EmptyState icon="search" title="Inbox пуст" action={<Button icon="plus">Создать задачу</Button>}>
        Новые задачи от агентов и из ночной сверки появятся здесь.
      </EmptyState>
    ),
  },
  {
    name: "Только заголовок",
    render: () => <EmptyState size="sm" title="На сегодня всё" />,
  },
  {
    name: "Пустая выборка",
    render: () => (
      <EmptyState icon="info" title="Расходов за ноябрь нет" action={<Link href="#">Показать октябрь</Link>}>
        Выписка из банка приходит 1-го числа следующего месяца.
      </EmptyState>
    ),
  },
  {
    name: "В карточке, длинное пояснение",
    render: () => (
      <Card>
        <EmptyState size="sm" icon="check" title="Скидок на избранное нет">
          Лента обновляет цены каждое утро в 06:00. Добавь товары в избранное на странице поиска, и скидки на них будут видны здесь и на стене в коридоре.
        </EmptyState>
      </Card>
    ),
  },
  {
    name: "В киоске",
    kiosk: true,
    render: () => <EmptyState size="sm" title="Никто не ждёт">Агенты работают сами</EmptyState>,
  },
];
