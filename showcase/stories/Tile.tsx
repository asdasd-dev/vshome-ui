import { useState } from "react";
import { Button, Cluster, IconButton, List, ListRow, Stat, Switch, Text, Tile } from "../../src";
import type { StoryFile } from "../catalog";

function Light() {
  const [on, setOn] = useState(true);
  return (
    <Tile label="Свет" aside={on ? "1 горит" : "всё выключено"}>
      <Switch label="Большая лента" checked={on} onChange={setOn} />
    </Tile>
  );
}

const meetings = ["AI Demo №4", "Deimos PBR", "1:1 с тимлидом", "Груминг BX", "Ретро", "Синк платформы", "Обед", "Ревью дизайна"];

export const meta: StoryFile["meta"] = { title: "Tile", group: "Поверхности", components: ["Tile"], doc: "Tile" };

export const stories: StoryFile["stories"] = [
  {
    name: "Подпись, aside и подвал",
    render: () => (
      <Cluster wrap align="stretch" gap="4">
        <div style={{ width: 280 }}>
          <Tile label="Музыка" footer={<Cluster><IconButton icon="prev" label="Предыдущий" /><IconButton icon="pause" label="Пауза" variant="primary" /><IconButton icon="next" label="Следующий" /></Cluster>}>
            <Stat value="If You Need Someone" caption="The Field Mice" size="md" />
          </Tile>
        </div>
        <div style={{ width: 280 }}><Light /></div>
      </Cluster>
    ),
  },
  {
    name: "Тона",
    render: () => (
      <Cluster wrap align="stretch" gap="4">
        <div style={{ width: 240 }}><Tile label="Сегодня"><Text>Встреч больше нет</Text></Tile></div>
        <div style={{ width: 240 }}>
          <Tile label="Встреча · 11:15" tone="warn" footer={<Button variant="primary">Войти</Button>}>
            <Stat value={1} unit="мин" caption="Deimos PBR" size="xl" tone="warn" />
          </Tile>
        </div>
        <div style={{ width: 240 }}><Tile label="Мак" tone="danger"><Text>Не на связи с 14:02</Text></Tile></div>
      </Cluster>
    ),
  },
  {
    name: "Прокрутка",
    render: () => (
      <div style={{ width: 280, height: 260, display: "grid" }}>
        <Tile label="Сегодня" aside={`${meetings.length} встреч`} scroll>
          <List>{meetings.map((m, i) => <ListRow key={m} lead={`${10 + i}:00`} title={m} />)}</List>
        </Tile>
      </div>
    ),
  },
  {
    name: "Приглушённая",
    render: () => (
      <div style={{ width: 280 }}>
        <Tile label="Mattermost" dimmed><Text tone="muted">Нет новых сообщений</Text></Tile>
      </div>
    ),
  },
  {
    name: "В киоске",
    kiosk: true,
    render: () => (
      <Cluster wrap align="stretch" gap="4">
        <div style={{ width: 300 }}>
          <Tile label="Ждут тебя · 2" aside="1 работает" tone="warn">
            <List max={4}>
              <ListRow lead="14 мин" title="GD · BX-55704" sub="Делать новости до четырёх?" tone="warn" onClick={() => {}} />
              <ListRow lead="2 мин" title="Опрос Avito" sub="Нужно разрешение: git push" subTone="warn" onClick={() => {}} />
            </List>
          </Tile>
        </div>
        <div style={{ width: 300 }}>
          <Tile label="Встреча · 11:15" aside={<Button size="sm" variant="warn" icon="dot">2 в MM</Button>}>
            <Text variant="title">Deimos PBR</Text>
          </Tile>
        </div>
      </Cluster>
    ),
  },
];
