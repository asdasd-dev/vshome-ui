import { Prose } from "../../src";
import type { StoryFile } from "../catalog";

const post = `<h2>Ритм заводов · неделя 41</h2>
<p>На заводе запустили вторую линию сборки. Подробности — на <a href="https://vshome.space">сайте</a>.</p>
<ul><li>новый заказ на 120 единиц;</li><li>итоги квартала выше плана.</li></ul>
<blockquote>Цитата директора о планах на следующий год.</blockquote>`;

export const meta: StoryFile["meta"] = { title: "Prose", group: "Текст и медиа", components: ["Prose"], doc: "Prose" };

export const stories: StoryFile["stories"] = [
  {
    name: "Разметка детьми",
    render: () => (
      <Prose>
        <h3>Как взять задачу</h3>
        <ol><li>Поставить статус <code>doing</code>.</li><li>Создать worktree с веткой <code>T-N-…</code>.</li><li>Открыть PR с заголовком <code>[T-N] …</code>.</li></ol>
        <p>Мёржит владелец: Апрув на доске или в GitHub.</p>
      </Prose>
    ),
  },
  { name: "Готовый HTML", render: () => <Prose html={post} /> },
  {
    name: "Таблица и код",
    render: () => (
      <Prose>
        <table>
          <thead><tr><th>Сервис</th><th>Порт</th></tr></thead>
          <tbody><tr><td>personalai</td><td>8080</td></tr><tr><td>lenta-tracker</td><td>8091</td></tr></tbody>
        </table>
        <pre><code>ssh box '~/monitoring/deploy.sh'</code></pre>
        <hr />
        <p>Последний деплой — 10:46.</p>
      </Prose>
    ),
  },
];
