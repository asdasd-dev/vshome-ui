import { Frame, Tile } from "../../src";
import type { StoryFile } from "../catalog";

const page = `data:text/html;charset=utf-8,${encodeURIComponent("<body style='margin:0;display:grid;place-items:center;height:100vh;font:16px system-ui;color:#888'>встроенная страница</body>")}`;

export const meta: StoryFile["meta"] = { title: "Frame", group: "Текст и медиа", components: ["Frame"], doc: "Frame" };

export const stories: StoryFile["stories"] = [
  { name: "Сама по себе", render: () => <div style={{ display: "flex", height: 240 }}><Frame src={page} title="Пример страницы" /></div> },
  {
    name: "Доска задач на «Столе»",
    kiosk: true,
    render: () => (
      <div style={{ display: "flex", height: 360 }}>
        <Tile label="Задачи"><Frame src={page} title="Доска задач" /></Tile>
      </div>
    ),
  },
];
